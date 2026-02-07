import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to company
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; text-transform: uppercase;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 30px; background: #f5f5f5;">
            <h2 style="color: #000; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 10px;">Contact Details</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <h3 style="color: #000; text-transform: uppercase; margin-top: 30px;">Message</h3>
            <div style="background: #fff; padding: 20px; border-left: 4px solid #000;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #000; color: #fff; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">LJ Esports Management © ${new Date().getFullYear()}</p>
          </div>
        </div>
      `,
    };

    // Auto-reply to user
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting LJ Esports',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #000; color: #fff; padding: 20px; text-align: center;">
            <h1 style="margin: 0; text-transform: uppercase;">LJ Esports Management</h1>
          </div>
          
          <div style="padding: 30px; background: #f5f5f5;">
            <h2 style="color: #000; text-transform: uppercase;">Thank You, ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.6;">
              We've received your message and appreciate you reaching out to us. 
              Our team will review your inquiry and get back to you within 24-48 hours.
            </p>
            
            <div style="background: #fff; padding: 20px; margin: 20px 0; border-left: 4px solid #000;">
              <p style="margin: 0 0 10px 0;"><strong>Your Message:</strong></p>
              <p style="margin: 0; white-space: pre-wrap; color: #666;">${message}</p>
            </div>
            
            <p style="font-size: 14px; color: #666;">
              If you need immediate assistance, please don't hesitate to reach out to us directly.
            </p>
          </div>
          
          <div style="background: #000; color: #fff; padding: 20px; text-align: center; font-size: 12px;">
            <p style="margin: 0 0 10px 0;">LJ Esports Management © ${new Date().getFullYear()}</p>
            <p style="margin: 0;">Elite Esports Management</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}