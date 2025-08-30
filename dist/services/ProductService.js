import prisma from "../lib/prismaClient.js";
export class ProductService {
    // Create product
    async createProduct(userId, data) {
        return prisma.product.create({
            data: { ...data, userId, approved: false },
        });
    }
    // Update product (only by owner)
    async updateProduct(userId, productId, data) {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product || product.userId !== userId)
            throw new Error("Not allowed");
        return prisma.product.update({ where: { id: productId }, data });
    }
    // Delete product (only by owner)
    async deleteProduct(userId, productId) {
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product || product.userId !== userId)
            throw new Error("Not allowed");
        await prisma.product.delete({ where: { id: productId } });
        return { message: "Product deleted" };
    }
    // Get all products of a user
    async getUserProducts(userId) {
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
    async approveProduct(productId) {
        return prisma.product.update({
            where: { id: productId },
            data: { approved: true },
        });
    }
    // Admin: Reject product
    async rejectProduct(productId) {
        return prisma.product.update({
            where: { id: productId },
            data: { approved: false },
        });
    }
}
