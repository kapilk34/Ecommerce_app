import {Router} from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getCart, addToCart, updateCartItems, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = Router();

router.use(protectRoute);

router.get("/",getCart);
router.post("/",addToCart);
router.put("/:productId",updateCartItems);
router.delete("/:productId",removeFromCart);
router.delete("/",clearCart);

export default router;