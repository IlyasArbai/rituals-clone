import { success } from "zod";
import { ProductRepo } from "./repo.js";

export class ProductController {
  static async index(req, res) {
    const products = await ProductRepo.all();
    return res.json({ success: true, products });
  }

  static async show(req, res) {
    const product = await ProductRepo.find(Number(req.params.id));

    if (!product) return res.json({ success: false });
    return res.json({ success: true, product });
  }

  static async edit(req, res) {
    try {
      const id = Number(req.params.id);
      console.log("1");
      if (!Number.isInteger(id) || id <= 0 || !(await ProductRepo.find(id)))
        return res.json({
          success: false,
        });

      await ProductRepo.update({ id }, req.validated.body);

      return res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: false,
        message: error.message,
      });
    }
  }

  static async destroy(req, res) {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0)
        return res.json({
          success: false,
        });

      await ProductRepo.delete({ id });

      return res.json({
        success: true,
      });
    } catch (err) {
      return res.json({
        success: false,
      });
    }
  }

  static async store(req, res) {
    try {
      await ProductRepo.create(req.validated.body);
      return res.json({ success: true });
    } catch (err) {
      return res.json({ success: false });
    }
  }
}
