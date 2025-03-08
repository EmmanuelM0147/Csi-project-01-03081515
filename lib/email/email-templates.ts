// Using a simpler template approach without Handlebars for static export
export interface RenderedTemplate {
  html: string;
  text: string;
}

export class EmailTemplate {
  private htmlTemplate: string;
  private textTemplate: string;

  constructor(htmlContent: string, textContent: string) {
    this.htmlTemplate = htmlContent;
    this.textTemplate = textContent;
  }

  render(data: Record<string, any>): RenderedTemplate {
    // Simple template variable replacement
    let html = this.htmlTemplate;
    let text = this.textTemplate;
    
    Object.entries(data).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      html = html.replace(regex, String(value));
      text = text.replace(regex, String(value));
    });
    
    return {
      html,
      text
    };
  }
}

// Contact Form Template
export const contactFormTemplate = new EmailTemplate(
  `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header { 
        background-color: #0A2240;
        color: white;
        padding: 20px;
        text-align: center;
        border-radius: 5px 5px 0 0;
      }
      .content {
        padding: 20px;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 5px 5px;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #666;
        text-align: center;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: bold;
        margin-bottom: 5px;
      }
      .value {
        margin-bottom: 15px;
      }
      .metadata {
        margin-top: 30px;
        padding-top: 15px;
        border-top: 1px solid #eee;
        font-size: 12px;
        color: #666;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">{{name}}</div>
      </div>
      
      <div class="field">
        <div class="label">Email:</div>
        <div class="value">{{email}}</div>
      </div>
      
      <div class="field">
        <div class="label">Subject:</div>
        <div class="value">{{subject}}</div>
      </div>
      
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">{{message}}</div>
      </div>
      
      <div class="metadata">
        <p>Submission Time: {{timestamp}}</p>
        <p>IP Address: {{ip}}</p>
        <p>User Agent: {{userAgent}}</p>
      </div>
    </div>
    <div class="footer">
      <p>This is an automated message from the Carlora website contact form.</p>
    </div>
  </body>
  </html>
  `,
  `
  NEW CONTACT FORM SUBMISSION
  
  Name: {{name}}
  Email: {{email}}
  Subject: {{subject}}
  
  Message:
  {{message}}
  
  ---
  Submission Time: {{timestamp}}
  IP Address: {{ip}}
  User Agent: {{userAgent}}
  
  This is an automated message from the Carlora website contact form.
  `
);