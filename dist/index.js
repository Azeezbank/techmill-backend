import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/Auth.js";
import productRoutes from "./routes/product.js";
import user from './routes/user.js';
import { errorHandler } from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
    res.send("TechMill Backend API running");
});
// Authentication route
app.use("/api/auth", authRoutes);
//Product route
app.use("/api/products", productRoutes);
//Users routes
app.use("/api/user", user);
// Global error handler (last)
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
