import { OrderRepo } from "./repo.js";

export class OrderController {
  static async edit(req, res) {
    try {
      const order = await OrderRepo.update(
        { id: Number(req.params.id) },
        { status: req.validated.body.status },
      );
      return res.json({ success: true, order });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, error: err.message });
    }
  }
}
