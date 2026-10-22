import bcrypt from "bcrypt";
import { AuthRepo } from "./repo.js";
import { UserRepo } from "../user/repo.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/email.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

const JWT_SECRET = process.env.JWT_SECRET;
const CLIENT_API = process.env.CLIENT_API;

export class AuthController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.validated.body;

      if (await UserRepo.find({ email }))
        return res.status(409).json({
          success: false,
          message: "Email is already registered",
        });

      const user = await UserRepo.create({
        name,
        email,
        password: await bcrypt.hash(password, 12),
      });

      const token = jwt.sign(
        {
          id: user.id,
          purpose: "email",
        },
        JWT_SECRET,
        {
          expiresIn: "15min",
        },
      );

      // send email
      await sendEmail({
        to: user.email,
        subject: "Verify your email",
        html: `
            <h2>Verify your email</h2>
            <p>Click the link below to verify your account.</p>
            <a href="${CLIENT_API + "/token/" + token}">Verify Email</a>
        `,
      });

      return res.json({ success: true });
    } catch (error) {
      return res.json({ success: false, err: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.validated.body;

      const user = await UserRepo.find({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const session = await AuthRepo.create({
        userId: user.id,
        expiresAt,
      });

      res.cookie("session", session.tokenHash, {
        ...cookieOptions,
        expires: expiresAt,
      });

      return res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          role: user.role,
        },
      });
    } catch (error) {
      return res.json({
        success: false,
      });
    }
  }

  static async logout(req, res) {
    try {
      await AuthRepo.delete(req.sessionTokenHash);
      res.clearCookie("session", cookieOptions);

      return res.json({
        success: true,
      });
    } catch (error) {
      return res.json({
        success: false,
        err: error.message,
      });
    }
  }

  static async me(req, res) {
    try {
      return res.status(200).json({
        success: true,
        user: req.user,
      });
    } catch (error) {
      return res.json({
        success: false,
        err: error.message,
      });
    }
  }

  static async sendToken(req, res) {
    try {
      console.log("controller");
      console.log(req.validated.body.purpose);

      const isReset = req.validated.body.purpose == "reset";

      const token = jwt.sign(
        {
          id: req.user.id,
          purpose: req.validated.body.purpose,
        },
        JWT_SECRET,
        {
          expiresIn: "15min",
        },
      );

      await sendEmail({
        to: req.user.email,
        subject: isReset ? "Reset Password" : "Verify Email",
        html: `
            <h2>${isReset ? "Reset Your Password" : "Verify Your Email"}</h2>

            <p>
            ${isReset ? "Click the link below to reset your password." : "Click the link below to verify your email address."}
            </p>

            <a href="${CLIENT_API}/token/${token}"> ${isReset ? "Reset Password" : "Verify Email"} </a>
            <p>This link expires in "15 minutes".</p>
            <p>If you didn't request this, you can ignore this email.</p>
        `,
      });

      return res.json({ success: true });
    } catch (err) {
      console.log(err);
      return res.json({ success: false });
    }
  }

  static async verifyToken(req, res) {
    try {
      const data = jwt.verify(req.params.token, JWT_SECRET);
      console.log(data);
      const user = await UserRepo.find({ id: data.id });
      if (!user || (data.purpose == "email" && user.emailVerified))
        return res.json({
          success: false,
          status: "expired",
        });

      console.log("pp");

      if (data.purpose == "email") {
        await UserRepo.update({ id: data.id }, { emailVerified: true });
        return res.json({
          success: true,
          status: "verified",
        });
      }

      console.log(data);
    } catch (err) {
      return res.json({
        success: false,
        status: "expired",
      });
    }
  }

  static async resetPassword(req, res) {}
}
