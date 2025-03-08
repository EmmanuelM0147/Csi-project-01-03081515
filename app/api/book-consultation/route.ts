import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { emailService } from "@/lib/email/email-service";
import { consultationBookingTemplate } from "@/lib/email/email-templates";
import { logError, logInfo } from "@/lib/logger";

// Consultation booking schema
const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.enum([
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Other"
  ]),
  companySize: z.enum([
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "500+"
  ]),
  consultationType: z.enum([
    "Business Strategy",
    "Digital Transformation",
    "Performance Optimization",
    "Market Analysis",
    "Innovation Consulting"
  ]),
  message: z.string().min(10, "Please provide more details about your needs"),
  preferredDate: z.string().min(1, "Please select a preferred date"),
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
    const validationResult = consultationSchema.safeParse(data);
    
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      logError('Consultation Booking Validation Failed', null, {
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
      subject: `New Consultation Request: ${validatedData.name} - ${validatedData.company}`,
      template: consultationBookingTemplate,
      templateData: {
        ...validatedData,
        timestamp: new Date().toISOString(),
        ip: diagnosticInfo.clientIP,
        userAgent: diagnosticInfo.userAgent
      }
    });

    if (!emailSent) {
      throw new Error("Failed to send email notification");
    }

    // Log successful submission
    logInfo('Consultation Booking Success', 'Consultation request submitted successfully', {
      ...diagnosticInfo,
      email: validatedData.email
    });

    return NextResponse.json(
      { success: true, message: "Consultation request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    logError('Consultation Booking Error', error, diagnosticInfo);
    
    return NextResponse.json(
      { 
        error: "We're experiencing technical difficulties. Please try again later or contact support directly."
      },
      { status: 500 }
    );
  }
}