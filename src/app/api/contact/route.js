import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Email validation helper
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Input sanitization helper
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

export async function POST(req) {
  try {
    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email configuration missing: EMAIL_USER or EMAIL_PASS not set");
      return NextResponse.json(
        { message: "Server configuration error. Please contact administrator." }, 
        { status: 500 }
      );
    }

    // 1. Parse and validate request body
    const body = await req.json();
    const { name, email, message, linkedin, github } = body;

    // 2. Input validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields: name, email, and message are required." }, 
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format." }, 
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { message: "Message too long. Please limit to 2000 characters." }, 
        { status: 400 }
      );
    }

    // 3. Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedLinkedin = sanitizeInput(linkedin || '');
    const sanitizedGithub = sanitizeInput(github || '');

    // 4. Setup the transporter with better error handling
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 5. Verify transporter configuration
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error("Email transporter verification failed:", verifyError);
      return NextResponse.json(
        { message: "Email service configuration error." }, 
        { status: 500 }
      );
    }

    // 6. Format the email content (using HTML for better readability)
    const mailOptions = {
      from: process.env.EMAIL_USER, // Better to use your own email to avoid Gmail spam filters
      to: process.env.EMAIL_USER,   // Sending the email to yourself
      replyTo: sanitizedEmail,      // This lets you reply directly to the sender
      subject: `🚀 Portfolio Message: ${sanitizedName}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <hr />
          <p><strong>LinkedIn:</strong> ${sanitizedLinkedin || "Not provided"}</p>
          <p><strong>GitHub:</strong> ${sanitizedGithub || "Not provided"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${sanitizedMessage}</div>
        </div>
      `,
    };

    // 7. Send the email with timeout
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email sending timeout')), 10000)
      )
    ]);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    
    // Return appropriate error message based on error type
    if (error.message === 'Email sending timeout') {
      return NextResponse.json(
        { message: "Email sending timed out. Please try again later." }, 
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: "Failed to send email. Please try again later." }, 
      { status: 500 }
    );
  }
}