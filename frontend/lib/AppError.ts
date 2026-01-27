// frontend/lib/AppError.ts
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Capture the stack trace properly
    Error.captureStackTrace(this, this.constructor);
  }
}