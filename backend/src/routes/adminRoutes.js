import { Router } from "express";
import { createProduct } from "../controllers/adminController.js";
import { adminOnly, protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.use( protectRoute, adminOnly);

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", getAllProducts);

export default router;