import { OrderRepo } from "../order/repo";

export class AdminController {
  static async me(req, res) {
    try {
      const orders = await OrderRepo.all();
      return res.status(200).json({
        success: true,
        orders,
      });
    } catch (error) {
      return res.json({
        success: false,
        err: error.message,
      });
    }
  }
}
