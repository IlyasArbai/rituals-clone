import { prisma } from "#root/src/utils/prisma.js";

export class OrderRepo {
  static async all(where) {
    return prisma.order.findMany({
      where,
      select: {
        id: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            product: {
              select: {
                name: true,
                image: true,
                price: true,
              },
            },
            quantity: true,
            price: true,
          },
        },
      },
    });
  }

  static async find(where) {
    return prisma.order.findFirst({
      where,
      include: {
        product: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  static async store(data) {
    return prisma.order.create({ data });
  }

  static async delete(where) {
    return prisma.order.deleteMany({
      where,
    });
  }
}
