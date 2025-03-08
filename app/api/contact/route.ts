import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { emailService } from "@/lib/email/email-service";
import { contactFormTemplate } from "@/lib/email/email-templates";
import { logError, logInfo } from "@/lib/logger";
import type { ContactFormData } from "@/types/contact";

// Enhanced email validation regex
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Contact form schema with detailed validation
const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name must contain only letters")
    .transform(val => val.trim()),
  email: z.string()
    .email("Invalid email format")
    .regex(emailRegex, "Please enter a valid email address")
    .transform(val => val.toLowerCase().trim()),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters")
    .transform(val => val.trim()),
  timestamp: z.string().datetime().optional(),
  honeypot: z.string().max(0).optional(),
});

export async function POST(request: Request) {
  const diagnosticInfo = {
    startTime: new Date().toISOString(),
    clientIP: request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent'),
  };

  try {
    // Rate limiting
    const limiter = await rateLimit(request);
    
    if (!limiter.success) {
      logError('Rate Limit Exceeded', null, diagnosticInfo);
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const data = await request.json();
    
    // Validate form data
    const validationResult = contactSchema.safeParse(data);
    
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      logError('Form Validation Failed', null, {
        ...diagnosticInfo,
        validationErrors
      });

      return NextResponse.json(
        { 
          error: "Please check your input and try again",
          details: validationErrors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Check honeypot
    if (validatedData.honeypot) {
      logError('Honeypot Triggered', null, diagnosticInfo);
      return NextResponse.json(
        { error: "Form submission rejected" },
        { status: 400 }
      );
    }

    // Send email notification
    const emailSent = await emailService.sendEmail({
      to: process.env.SMTP_USER!,
      subject: `Contact Form: ${validatedData.name}`,
      template: contactFormTemplate,
      templateData: {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
        timestamp: new Date().toISOString(),
        ip: diagnosticInfo.clientIP,
        userAgent: diagnosticInfo.userAgent
      }
    });

    if (!emailSent) {
      throw new Error("Failed to send email notification");
    }

    // Log successful submission
    logInfo('Form Submission Success', 'Contact form submitted successfully', {
      ...diagnosticInfo,
      email: validatedData.email
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    logError('Contact Form Error', error, diagnosticInfo);
    
    return NextResponse.json(
      { 
        error: "We're experiencing technical difficulties. Please try again later or contact support directly."
      },
      { status: 500 }
    );
  }
}