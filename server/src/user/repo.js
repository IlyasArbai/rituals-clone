import { prisma } from "../utils/prisma.js";

export class UserRepo {
  static async all() {
    return prisma.user.findMany();
  }

  static async find(where) {
    return prisma.user.findFirst({ where });
  }

  static async create(data) {
    return prisma.user.create({ data });
  }

  static async count() {
    return prisma.user.count();
  }

  static async update(where, data) {
    return prisma.user.update({
      where,
      data,
    });
  }
}
