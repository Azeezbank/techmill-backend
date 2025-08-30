import prisma from "../lib/prismaClient.js";

interface ProductInput {
  name: string;
  price: number;
  description: string;
  quantity: number;
}

export class ProductService {
  // Create product
  async createProduct(userId: string, data: ProductInput) {
    return prisma.product.create({
      data: { ...data, userId, approved: false },
    });
  }

  // Update product (only by owner)
  async updateProduct(userId: string, productId: number, data: ProductInput) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.userId !== userId) throw new Error("Not allowed");

    return prisma.product.update({ where: { id: productId }, data });
  }

  // Delete product (only by owner)
  async deleteProduct(userId: string, productId: number) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.userId !== userId) throw new Error("Not allowed");

    await prisma.product.delete({ where: { id: productId } });
    return { message: "Product deleted" };
  }

  // Get all products of a user
  async getUserProducts(userId: string) {
    return prisma.product.findMany({ where: { userId } });
  }

  // Get public products (approved)
  async getPublicProducts() {
    return prisma.product.findMany({
      where: { approved: true },
      include: { user: { select: { id: true, name: true } } },
    });
  }

  // Admin: Approve product
  async approveProduct(productId: number) {
    return prisma.product.update({
      where: { id: productId },
      data: { approved: true },
    });
  }

  // Admin: Reject product
  async rejectProduct(productId: number) {
    return prisma.product.update({
      where: { id: productId },
      data: { approved: false },
    });
  }
}