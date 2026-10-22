import { OrderRepo } from "../order/repo.js";
import { UserRepo } from "./repo.js";

export class UserController {
  static async me(req, res) {
    try {
        const orders = await OrderRepo.all({ userId: req.user.id })

      return res.json({ success: true, orders });
    } catch (err) {}
  }

  static async edit(req, res) {
    try {
      const data = req.validated.body;
      const user = await UserRepo.update({ id: req.user.id }, data);
      return res.json({
        success: true,
        user: {
          name: user.name,
          email: user.email,
          emailVerified: user.emailVerified,
          role: user.role,
        },
      });
    } catch (err) {}
  }
}
