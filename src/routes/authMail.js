const express = require("express");
const transporter = require("../config/mailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "user@example.com",
      subject: "Test Email",
      text: "Hello from Express.js",
    });

    res.json({ message: "Email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

module.exports = router;