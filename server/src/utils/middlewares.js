import { AuthRepo } from "../auth/repo.js";

export async function authenticate(req, res, next) {
  try {
    const tokenHash = req.cookies?.session;
    if (!tokenHash)
      return res.json({
        success: false,
        message: "Unauthorized",
      });

    const session = await AuthRepo.find({ tokenHash });

    if (!session || session.expiresAt <= new Date()) {
      if (session) await AuthRepo.delete({ tokenHash });

      res.clearCookie("session", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.json({
        success: false,
        message: "Invalid or expired session",
      });
    }

    req.user = session.user;
    req.sessionTokenHash = tokenHash;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
}
export function requireAdmin(req, res, next) {
  if (req.user.role !== "ADMIN")
    return res.json({
      success: false,
      message: "Forbidden",
    });

  console.log("admin");

  next();
}
export const validate = (schema) => (req, res, next) => {
  console.log("valdation");

  const result = schema.safeParse({
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (!result.success)
    return res.json({
      success: false,
      message: "Validation failed",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });

  req.validated = result.data;
  next();
};
