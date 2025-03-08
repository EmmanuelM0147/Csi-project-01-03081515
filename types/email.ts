export interface EmailMessage {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text: string;
}

export interface EmailProvider {
  name: string;
  send(message: EmailMessage): Promise<any>;
}