import { Router } from "express";
import { createProduct, getAllProducts, updateProduct } from "../controllers/adminController.js";
import { adminOnly, protectRoute } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = Router();

router.use( protectRoute, adminOnly);

router.post("/products", upload.array("images",3), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.array("images",3), updateProduct);

export default router;