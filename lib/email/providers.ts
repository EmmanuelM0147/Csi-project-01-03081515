import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
import type { EmailProvider, EmailMessage } from '@/types/email';

// Configure SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Gmail Provider
const gmailProvider: EmailProvider = {
  name: 'gmail',
  async send(message: EmailMessage) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
        minVersion: 'TLSv1.2'
      },
      debug: process.env.NODE_ENV !== 'production',
      logger: process.env.NODE_ENV !== 'production'
    });

    await transporter.verify();
    return transporter.sendMail(message);
  }
};

// SendGrid Provider
const sendGridProvider: EmailProvider = {
  name: 'sendgrid',
  async send(message: EmailMessage) {
    return sgMail.send({
      to: message.to,
      from: message.from || process.env.SMTP_FROM!,
      subject: message.subject,
      html: message.html,
      text: message.text
    });
  }
};

// Email Service with Fallback
export class EmailService {
  private providers: EmailProvider[];
  private currentProviderIndex: number = 0;

  constructor(providers: EmailProvider[] = [gmailProvider, sendGridProvider]) {
    this.providers = providers;
  }

  async sendEmail(message: EmailMessage): Promise<boolean> {
    const errors: Error[] = [];
    
    // Try each provider in sequence until one succeeds
    for (let i = 0; i < this.providers.length; i++) {
      const providerIndex = (this.currentProviderIndex + i) % this.providers.length;
      const provider = this.providers[providerIndex];
      
      try {
        await provider.send(message);
        // Update the starting provider for next time
        this.currentProviderIndex = providerIndex;
        return true;
      } catch (error) {
        console.error(`Email provider ${provider.name} failed:`, error);
        errors.push(error as Error);
        continue;
      }
    }

    // If we get here, all providers failed
    console.error('All email providers failed:', errors);
    throw new Error('Failed to send email through any provider');
  }
}

export const emailService = new EmailService();