import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import AuthRoutes from "./auth/routes.js";
import ProductRoutes from "./product/routes.js";
import UserRoutes from "./user/routes.js";
import { sendEmail } from "./utils/email.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);
app.use("/users", UserRoutes);

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        error: "to, subject, and message are required",
      });
    }

    await sendEmail({
      to,
      subject,
      text: message,
    });

    return res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Failed to send email:", error.message);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
});

app.listen("3000", () => {
  console.log(`Server is running on port 3000`);
});
