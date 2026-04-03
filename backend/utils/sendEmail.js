import axios from "axios";

export const sendEmail = async (to, subject, text) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          email: "221281@kit.ac.in",
          name: "GolfGive"
        },
        to: [{ email: to }],
        subject: subject,
        textContent: text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent");
  } catch (err) {
    console.log("❌ Email error:", err.response?.data || err.message);
  }
};