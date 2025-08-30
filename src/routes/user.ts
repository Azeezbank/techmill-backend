
import express from "express";
import { AuthRequest, AuthGuard } from "../middleware/Auth.middleware.js";
import { RoleGuard } from "../middleware/admin.middleware.js";
import { UserService } from "../services/UserService.js";

const router = express.Router();
const userService = new UserService();

// GET all users (admin only)
router.get("/", RoleGuard.admin, async (_req: AuthRequest, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});

// BAN user
router.patch("/ban/:id", RoleGuard.admin, async (req: AuthRequest, res) => {
  try {
    const user = await userService.banUser(req.params.id);
    res.json({ message: "User banned successfully", user });
  } catch (err: any) {
    res.status(500).json({ message: "Error banning user", error: err });
  }
});

// UNBAN user
router.patch("/unban/:id", RoleGuard.admin, async (req: AuthRequest, res) => {
  try {
    const user = await userService.unbanUser(req.params.id);
    res.json({ message: "User unbanned successfully", user });
  } catch (err: any) {
    console.error('Error unbanning user', err)
    return res.status(500).json({ message: "Error unbanning user" });
  }
});

router.patch("/make/admin/:id", AuthGuard.authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await userService.makeAdmin(req.params.id);
    res.json({ message: 'User now am Admin'});
  } catch (err: any) {
    console.error('Failed to make the user an admin', err)
    return res.status(500).json({ message: 'Failed to make the user an admin'})
  }
})

export default router;