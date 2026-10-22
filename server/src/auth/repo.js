import { prisma } from "#root/src/utils/prisma.js";

export class AuthRepo {
  static async find(where) {
    return prisma.session.findFirst({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            role: true,
          },
        },
      },
    });
  }

  static async create(data) {
    return prisma.session.create({ data });
  }

  static async delete(tokenHash) {
    return prisma.session.deleteMany({
      where: { tokenHash },
    });
  }
}
