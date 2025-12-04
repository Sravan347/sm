const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ===== VALIDATION =====
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, and Message are required fields.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Save to DB
    const contact = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    // ===== SEND EMAIL =====
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_MAIL, // FIXED
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial; background:#f9f9f9; padding:20px; border-radius:10px;">
          <h2 style="color:#333;">📩 New Contact Request</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "N/A"}</p>

          <p style="margin-top:20px;"><b>Message:</b></p>
          <p style="background:#fff; padding:15px; border-radius:8px; border:1px solid #ddd;">
            ${message}
          </p>

          <p style="margin-top:25px; color:#666;">From your website contact form.</p>
        </div>
      `,
    });

    // SUCCESS RESPONSE WITH THE DATA
    res.status(201).json({
      success: true,
      message: "Form submitted successfully!",
      data: contact,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error submitting form" });
  }
};

module.exports = { submitContact };
