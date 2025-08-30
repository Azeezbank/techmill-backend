// middleware/AuthGuard.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthUser {
  id: string;
  email: string;
  role: "User" | "Admin";
  banned?: boolean; // optional: track banned users
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export class AuthGuard {
  // Verify JWT and attach user to request
  static authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;

      if (decoded.banned) {
        return res.status(403).json({ message: "Your account is banned" });
      }

      req.user = decoded;
      next();
    } catch (err) {
      console.error("Invalid token", err);
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}