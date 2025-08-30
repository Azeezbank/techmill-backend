import prisma from "../lib/prismaClient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export class AuthService {
    // Register a new user
    async register(name, email, password) {
        if (!name || !email || !password)
            throw new Error("All fields are required");
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            throw new Error("Email already in use");
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });
        return { id: user.id, name: user.name, email: user.email };
    }
    // Login user
    async login(email, password) {
        if (!email || !password)
            throw new Error("All fields are required");
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("Invalid credentials");
        if (user.banned)
            throw new Error("Unauthorized access, you have been banned");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role, banned: user.banned }, process.env.JWT_SECRET, { expiresIn: "1d" });
        return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
    }
}
