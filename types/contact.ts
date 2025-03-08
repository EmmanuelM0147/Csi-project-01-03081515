export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp?: string;
  honeypot?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}

export interface EmailError extends Error {
  code?: string;
  command?: string;
  responseCode?: number;
  response?: string;
}