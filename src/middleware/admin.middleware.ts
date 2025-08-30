import { Response, NextFunction } from "express";
import { AuthRequest } from "./Auth.middleware.js";

export class RoleGuard {
  static admin(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "Admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  }

  static user(req: AuthRequest, res: Response, next: NextFunction) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.user.role !== "User") {
      return res.status(403).json({ message: "User access only" });
    }

    next();
  }
}