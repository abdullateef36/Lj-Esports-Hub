import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const { fullName, email, phone, lga, address, items, total, reference } =
      await request.json();

    if (
      !fullName ||
      !email ||
      !phone ||
      !lga ||
      !address ||
      !items ||
      !total ||
      !reference
    ) {
      return NextResponse.json(
        { error: "Missing required order fields." },
        { status: 400 }
      );
    }

    const formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    });

    const itemRows = (items as OrderItem[])
      .map(
        (item) => `
          <tr>
            <td style="padding:8px 0;">${item.name}</td>
            <td style="padding:8px 0; text-align:center;">${item.quantity}</td>
            <td style="padding:8px 0; text-align:right;">${formatter.format(
              item.price * item.quantity
            )}</td>
          </tr>
        `
      )
      .join("");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const logoUrl =
      "https://res.cloudinary.com/dogtpp7tp/image/upload/v1770731462/logo_one_x0e35n.jpg";

    const baseStyles = `
      <style>
        body { margin:0; padding:0; background:#f4f4f4; }
        table { border-collapse:collapse; }
        img { border:0; outline:none; text-decoration:none; }
        .container { width:100%; background:#f4f4f4; padding:24px 12px; }
        .card { max-width:680px; margin:0 auto; background:#ffffff; border:1px solid #e5e5e5; }
        .header { background:#000000; color:#ffffff; padding:20px 24px; }
        .logo { width:56px; height:56px; border-radius:8px; background:#fff; padding:6px; }
        .title { font-size:22px; font-weight:700; letter-spacing:1px; text-transform:uppercase; margin:0; }
        .subtle { color:#6b7280; font-size:12px; text-transform:uppercase; letter-spacing:1px; }
        .section { padding:20px 24px; }
        .divider { height:1px; background:#e5e5e5; }
        .label { font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:1px; }
        .value { font-size:14px; color:#111827; font-weight:600; }
        .table th { text-align:left; font-size:12px; color:#6b7280; text-transform:uppercase; letter-spacing:1px; padding-bottom:8px; }
        .table td { font-size:14px; padding:8px 0; color:#111827; }
        .total { font-size:18px; font-weight:700; }
        .footer { padding:18px 24px; background:#000; color:#fff; font-size:12px; text-align:center; }
        @media (max-width: 520px) {
          .header { padding:16px; }
          .section { padding:16px; }
          .title { font-size:18px; }
          .logo { width:48px; height:48px; }
        }
      </style>
    `;

    const adminMail = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Shop Order: ${reference}`,
      html: `
        <!doctype html>
        <html>
          <head>${baseStyles}</head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <table width="100%">
                    <tr>
                      <td style="width:70px;">
                        <img class="logo" src="${logoUrl}" alt="LJ Esports" />
                      </td>
                      <td>
                        <div class="subtle">LJ Esports Management</div>
                        <h1 class="title">New Order Received</h1>
                      </td>
                      <td style="text-align:right; font-size:12px;">
                        Ref: ${reference}
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="section">
                  <div class="label">Customer</div>
                  <p class="value">${fullName}</p>
                  <p class="value">${email}</p>
                  <p class="value">${phone}</p>
                  <p class="value">${address}</p>
                  <p class="value">LGA: ${lga}</p>
                </div>

                <div class="divider"></div>

                <div class="section">
                  <div class="label" style="margin-bottom:8px;">Items</div>
                  <table width="100%" class="table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th style="text-align:center;">Qty</th>
                        <th style="text-align:right;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemRows}
                    </tbody>
                  </table>
                  <div style="margin-top:14px; text-align:right;" class="total">
                    Total: ${formatter.format(total)}
                  </div>
                </div>

                <div class="footer">
                  LJ Esports Management • Order Notification
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const customerMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Order Confirmation: ${reference}`,
      html: `
        <!doctype html>
        <html>
          <head>${baseStyles}</head>
          <body>
            <div class="container">
              <div class="card">
                <div class="header">
                  <table width="100%">
                    <tr>
                      <td style="width:70px;">
                        <img class="logo" src="${logoUrl}" alt="LJ Esports" />
                      </td>
                      <td>
                        <div class="subtle">LJ Esports Management</div>
                        <h1 class="title">Order Confirmed</h1>
                      </td>
                      <td style="text-align:right; font-size:12px;">
                        Ref: ${reference}
                      </td>
                    </tr>
                  </table>
                </div>

                <div class="section">
                  <p style="margin:0 0 10px 0; font-size:14px;">Hi ${fullName},</p>
                  <p style="margin:0 0 10px 0; font-size:14px;">
                    Thanks for your purchase. Your order is confirmed.
                  </p>
                </div>

                <div class="divider"></div>

                <div class="section">
                  <div class="label" style="margin-bottom:8px;">Items</div>
                  <table width="100%" class="table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th style="text-align:center;">Qty</th>
                        <th style="text-align:right;">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${itemRows}
                    </tbody>
                  </table>
                  <div style="margin-top:14px; text-align:right;" class="total">
                    Total: ${formatter.format(total)}
                  </div>
                </div>

                <div class="section">
                  <div class="label">Delivery</div>
                  <p class="value">${address}</p>
                  <p class="value">LGA: ${lga}</p>
                </div>

                <div class="footer">
                  We will contact you when your order is ready.
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(adminMail);
    await transporter.sendMail(customerMail);

    return NextResponse.json({ message: "Order emails sent." }, { status: 200 });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json(
      { error: "Failed to send order emails." },
      { status: 500 }
    );
  }
}
