import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import formidable from "formidable";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { emailService } from "@/lib/email/email-service";
import { applicationFormTemplate } from "@/lib/email/email-templates";
import { logError, logInfo } from "@/lib/logger";

// Application form schema
const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  message: z.string().min(10, "Please provide more details"),
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

    // Parse multipart form data
    const form = formidable({
      uploadDir: join(process.cwd(), 'tmp'),
      filename: (name, ext, part) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        return `${part.name || 'file'}-${uniqueSuffix}${ext}`;
      },
      maxFileSize: 5 * 1024 * 1024, // 5MB limit
      filter: ({ mimetype }) => {
        // Allow only PDF files
        return mimetype === 'application/pdf';
      },
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Validate form data
    const validationResult = applicationSchema.safeParse(fields);
    
    if (!validationResult.success) {
      const validationErrors = validationResult.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));

      logError('Application Form Validation Failed', null, {
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

    // Send email with attachment
    const emailSent = await emailService.sendEmail({
      to: process.env.SMTP_USER!,
      subject: `Application Form: ${validatedData.name}`,
      template: applicationFormTemplate,
      templateData: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
        timestamp: new Date().toISOString(),
        ip: diagnosticInfo.clientIP,
        userAgent: diagnosticInfo.userAgent
      },
      attachments: files.resume ? [
        {
          filename: files.resume.name,
          path: files.resume.path
        }
      ] : []
    });

    if (!emailSent) {
      throw new Error("Failed to send email notification");
    }

    // Clean up uploaded file
    if (files.resume) {
      await writeFile(files.resume.path, '');
    }

    // Log successful submission
    logInfo('Application Form Success', 'Application submitted successfully', {
      ...diagnosticInfo,
      email: validatedData.email
    });

    return NextResponse.json(
      { message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    logError('Application Form Error', error, diagnosticInfo);
    
    return NextResponse.json(
      { 
        error: "We're experiencing technical difficulties. Please try again later or contact support directly."
      },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};