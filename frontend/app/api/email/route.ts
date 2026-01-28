import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { welcomeTemplate } from "@/lib/templates/welcome"; // Ensure you created this from the previous step
import { handleError } from "@/lib/errorHandler";
import { AppError } from "@/lib/AppError";

export async function POST(req: Request) {
  try {
    const { to, name } = await req.json();

    // 1. Validation
    if (!to || !name) {
      throw new AppError("Missing 'to' email or 'name'", 400);
    }

    // 2. Generate Content
    const emailHtml = welcomeTemplate(name);

    // 3. Send Email (Using Nodemailer now)
    await sendEmail({
      to,
      subject: "Welcome to Rail Sync! 🚆",
      html: emailHtml,
    });

    return NextResponse.json({ 
      success: true, 
      message: "Email sent successfully via Gmail!" 
    });

  } catch (error) {
    return handleError(error, "POST /api/email");
  }
}