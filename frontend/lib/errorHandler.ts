// frontend/lib/errorHandler.ts
import { NextResponse } from "next/server";
import { logger } from "./logger";
import { Prisma } from "@prisma/client";
import { AppError } from "./AppError"; // <--- Import the new class

export function handleError(error: any, context: string) {
  const isProd = process.env.NODE_ENV === "production";
  
  let status = 500;
  let message = "Internal Server Error";

  // 1. Handle Custom App Errors (e.g., 400, 401, 403)
  if (error instanceof AppError) {
    status = error.statusCode;
    message = error.message;
  }
  // 2. Handle Prisma Errors
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      status = 409;
      const target = (error.meta?.target as string[])?.join(", ") || "field";
      message = `Duplicate value for ${target}`;
    }
    else if (error.code === 'P2025') {
      status = 404;
      message = "Record not found";
    }
  }
  // 3. Handle Standard Javascript Errors
  else if (error instanceof Error) {
    message = error.message;
  }

  // Final Safety Net for Production
  if (isProd && status === 500) {
    message = "Something went wrong. Please try again later.";
  }

  // Log everything internally
  logger.error(`Error in ${context}`, {
    message: error.message,
    stack: isProd ? "REDACTED" : error.stack,
    status
  });

  return NextResponse.json({ success: false, message }, { status });
}