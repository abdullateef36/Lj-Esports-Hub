import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, serviceName, applicant, applicationId } = body;

    if (!type || !serviceName || !applicant) {
      return NextResponse.json(
        { error: "Missing required service application fields." },
        { status: 400 }
      );
    }

    if (!applicant.name || !applicant.email || !applicant.phone) {
      return NextResponse.json(
        { error: "Missing required applicant fields." },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    if (type === "admin") {
      if (!applicationId) {
        return NextResponse.json(
          { error: "Missing required application ID." },
          { status: 400 }
        );
      }
      // Send notification to admin
      const logoUrl = "https://res.cloudinary.com/dogtpp7tp/image/upload/v1770731462/logo_one_x0e35n.jpg";
      
      const adminHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #000;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .logo {
                max-width: 120px;
                height: auto;
                margin-bottom: 15px;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border: 2px solid #000;
                margin-top: 20px;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                text-transform: uppercase;
                font-size: 12px;
                color: #666;
              }
              .value {
                margin-top: 5px;
                color: #000;
              }
              .button {
                display: inline-block;
                background: #000;
                color: #fff;
                padding: 12px 24px;
                text-decoration: none;
                font-weight: bold;
                text-transform: uppercase;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${logoUrl}" alt="LJ Esports Logo" class="logo" />
                <h1>NEW SERVICE APPLICATION</h1>
              </div>
              <div class="content">
                <div class="field">
                  <div class="label">Service</div>
                  <div class="value">${serviceName}</div>
                </div>
                <div class="field">
                  <div class="label">Applicant Name</div>
                  <div class="value">${applicant.name}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${applicant.email}</div>
                </div>
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value">${applicant.phone}</div>
                </div>
                ${
                  applicant.organization
                    ? `
                <div class="field">
                  <div class="label">Organization/Team</div>
                  <div class="value">${applicant.organization}</div>
                </div>
                `
                    : ""
                }
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value">${applicant.message}</div>
                </div>
                <div class="field">
                  <div class="label">Application ID</div>
                  <div class="value">${applicationId}</div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Service Application: ${serviceName}`,
        html: adminHtml,
      });
    } else if (type === "user") {
      const logoUrl = "https://res.cloudinary.com/dogtpp7tp/image/upload/v1770731462/logo_one_x0e35n.jpg";
      
      // Send confirmation to user
      const userHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #000;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .logo {
                max-width: 120px;
                height: auto;
                margin-bottom: 15px;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border: 2px solid #000;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="${logoUrl}" alt="LJ Esports Logo" class="logo" />
                <h1>Application Confirmed</h1>
              </div>
              <div class="content">
                <p>Dear ${applicant.name},</p>
                
                <p>Thank you for your interest in our <strong>${serviceName}</strong> service!</p>
                
                <p>We have successfully received your application and our team is reviewing it. We will get back to you within 2-3 business days with next steps.</p>
                
                <p>In the meantime, if you have any questions or need to provide additional information, please don't hesitate to reach out to us.</p>
                
                <p>We're excited about the opportunity to work with you!</p>
                
                <p style="margin-top: 30px;">
                  <strong>Best regards,</strong><br>
                  The LJ Esports Team
                </p>
              </div>
            </div>
          </body>
        </html>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: applicant.email,
        subject: `Application Confirmed: ${serviceName}`,
        html: userHtml,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid email type." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Service application email sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send service application email." },
      { status: 500 }
    );
  }
}
