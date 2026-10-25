import { OrderRepo } from "../order/repo.js";
import { UserRepo } from "../user/repo.js";

export class AdminController {
  static async dashboard(req, res) {
    try {
      const users = await UserRepo.all();
      const orders = await OrderRepo.all({},{});
      return res.status(200).json({
        success: true,
        orders,
        users,
      });
    } catch (error) {
      return res.json({
        success: false,
        err: error.message,
      });
    }
  }
}
