// Enhanced logging utility with structured output
export const logError = (context: string, error: any, metadata: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString();
  console.error({
    timestamp,
    context,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: (error as any).code
    } : error,
    ...metadata
  });
};

export const logInfo = (context: string, message: string, metadata: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString();
  console.log({
    timestamp,
    context,
    message,
    ...metadata
  });
};

export const logWarning = (context: string, message: string, metadata: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString();
  console.warn({
    timestamp,
    context,
    message,
    ...metadata
  });
};