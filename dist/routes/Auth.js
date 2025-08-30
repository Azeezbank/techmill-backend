import { Router } from "express";
import { AuthService } from "../services/AuthService.js";
import validate from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
const router = Router();
const authService = new AuthService();
// Register
router.post("/register", validate(registerSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await authService.register(name, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Login
router.post("/login", validate(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json({ message: "Login successful", ...result });
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
export default router;
