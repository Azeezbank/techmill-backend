import prisma from "../lib/prismaClient.js";
export class UserService {
    // Get all users (admin only)
    async getAllUsers() {
        return prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, banned: true, createdAt: true },
        });
    }
    // Ban a user
    async banUser(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: { banned: true },
        });
    }
    // Unban a user
    async unbanUser(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: { banned: false },
        });
    }
    //Make user an admin
    async makeAdmin(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: { role: 'Admin' },
        });
    }
}
