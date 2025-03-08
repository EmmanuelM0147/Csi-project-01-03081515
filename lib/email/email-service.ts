import nodemailer from 'nodemailer';
import { EmailTemplate } from './email-templates';
import { logError, logInfo } from '@/lib/logger';
import { sanitizeHtml } from '@/lib/utils';

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  replyTo?: string;
  attachments?: any[];
  template?: EmailTemplate;
  templateData?: Record<string, any>;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private defaultFrom: string;
  private isConfigured: boolean = false;
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second

  constructor() {
    this.defaultFrom = process.env.SMTP_FROM || '';
    this.initializeTransporter();
  }

  private initializeTransporter() {
    try {
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        this.isConfigured = false;
        console.warn('Email service not configured: Missing SMTP credentials');
        return;
      }

      this.transporter = nodemailer.createTransport({
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
        pool: true, // Use pooled connections
        maxConnections: 5,
        maxMessages: 100,
        rateLimit: 5, // 5 messages per second
        debug: process.env.NODE_ENV !== 'production',
        logger: process.env.NODE_ENV !== 'production'
      });

      this.isConfigured = true;
    } catch (error) {
      this.isConfigured = false;
      logError('Email Service Initialization Error', error);
    }
  }

  public async verifyConnection(): Promise<boolean> {
    if (!this.isConfigured || !this.transporter) {
      return false;
    }

    try {
      await this.transporter.verify();
      logInfo('Email Service', 'Connection verified successfully');
      return true;
    } catch (error) {
      logError('Email Connection Verification Error', error);
      return false;
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  }

  private validateEmails(emails: string | string[]): boolean {
    const emailList = Array.isArray(emails) ? emails : [emails];
    return emailList.every(email => this.validateEmail(email));
  }

  private async sendWithRetry(mailOptions: any, retries = 0): Promise<boolean> {
    try {
      if (!this.transporter) {
        throw new Error('Email transporter not initialized');
      }

      const info = await this.transporter.sendMail(mailOptions);
      
      if (process.env.NODE_ENV !== 'production') {
        console.log('Email sent:', info.messageId);
        if (info.messageId && nodemailer.getTestMessageUrl) {
          console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        }
      }
      
      logInfo('Email Service', 'Email sent successfully', {
        messageId: info.messageId,
        to: mailOptions.to
      });

      return true;
    } catch (error) {
      if (retries < this.maxRetries) {
        logInfo('Email Service', `Retrying email send (attempt ${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
        return this.sendWithRetry(mailOptions, retries + 1);
      }
      throw error;
    }
  }

  public async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      // Validate email addresses
      if (!this.validateEmails(options.to)) {
        throw new Error('Invalid email address(es)');
      }

      // In development or if not configured, just log and return success
      if (process.env.NODE_ENV === 'development' || !this.isConfigured) {
        console.log('Email would be sent in production:', options);
        return true;
      }

      // Apply template if provided
      let html = options.html;
      let text = options.text;

      if (options.template && options.templateData) {
        const rendered = options.template.render(options.templateData);
        html = rendered.html;
        text = rendered.text;
      }

      // Sanitize HTML content
      if (html) {
        html = sanitizeHtml(html);
      }

      const mailOptions = {
        from: {
          name: 'Carlora Strategic Innovation',
          address: options.from || this.defaultFrom
        },
        to: Array.isArray(options.to) ? options.to.join(',') : options.to,
        subject: options.subject,
        text: text,
        html: html,
        replyTo: options.replyTo,
        attachments: options.attachments,
        headers: {
          'X-Entity-Ref-ID': Date.now().toString(), // Prevent duplicate emails
          'List-Unsubscribe': `<mailto:unsubscribe@${process.env.SMTP_FROM?.split('@')[1] || 'carlora.com'}>`,
        }
      };

      return await this.sendWithRetry(mailOptions);
    } catch (error) {
      logError('Email Sending Error', error, {
        to: options.to,
        subject: options.subject
      });
      return false;
    }
  }

  public async testConnection(): Promise<{
    success: boolean;
    message: string;
  }> {
    try {
      const isConnected = await this.verifyConnection();
      if (!isConnected) {
        return {
          success: false,
          message: 'Failed to connect to email server'
        };
      }

      // Send test email
      const testResult = await this.sendEmail({
        to: process.env.SMTP_USER!,
        subject: 'Email System Test',
        text: 'This is a test email to verify the email system is working correctly.',
        html: '<p>This is a test email to verify the email system is working correctly.</p>'
      });

      return {
        success: testResult,
        message: testResult ? 'Email system is working correctly' : 'Failed to send test email'
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Singleton instance
export const emailService = new EmailService();