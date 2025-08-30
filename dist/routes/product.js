import { Router } from "express";
import { AuthGuard } from "../middleware/Auth.middleware.js";
import { RoleGuard } from "../middleware/admin.middleware.js";
import { ProductService } from "../services/ProductService.js";
const router = Router();
const productService = new ProductService();
// Create product
router.post("/", AuthGuard.authenticate, async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.user.id, req.body);
        res.status(201).json(product);
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Update product
router.put("/:id", AuthGuard.authenticate, async (req, res, next) => {
    try {
        const updated = await productService.updateProduct(req.user.id, Number(req.params.id), req.body);
        res.json(updated);
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Delete product
router.delete("/:id", AuthGuard.authenticate, async (req, res, next) => {
    try {
        const result = await productService.deleteProduct(req.user.id, Number(req.params.id));
        res.json(result);
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Get user products
router.get("/my-products", AuthGuard.authenticate, async (req, res, next) => {
    try {
        const products = await productService.getUserProducts(req.user.id);
        res.json(products);
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Get public products
router.get("/public", async (_req, res, next) => {
    try {
        const products = await productService.getPublicProducts();
        res.json(products);
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Approve product (admin)
router.put("/:id/approve", AuthGuard.authenticate, RoleGuard.admin, async (req, res, next) => {
    try {
        const product = await productService.approveProduct(Number(req.params.id));
        res.json({ message: "Product approved successfully", product });
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
// Reject product (admin)
router.put("/:id/reject", AuthGuard.authenticate, RoleGuard.admin, async (req, res, next) => {
    try {
        const product = await productService.rejectProduct(Number(req.params.id));
        res.json({ message: "Product rejected successfully", product });
    }
    catch (error) {
        next(error); // pass error to global handler
    }
});
export default router;
