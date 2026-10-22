import { prisma } from "#root/src/utils/prisma.js";

export class ProductRepo {
  static async all() {
    return prisma.product.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        oldPrice: true,
        image: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  static async find(id) {
    return prisma.product.findUnique({
      where: { id },
    });
  }

  static async update(where, data) {
    return prisma.product.update({
      where,
      data,
    });
  }

  static async delete(where) {
    return prisma.product.delete({
      where,
    });
  }

  static async create(data) {
    return prisma.product.create({
      data,
    });
  }
}
