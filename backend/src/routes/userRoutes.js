import { Router } from "express";
import { addAddress, getAddress, updateAddress, deleteAddress, addToWishlist, removeFromWishlist, getWishlist } from "../controllers/userControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = Router();

router.use(protectRoute);

//address router
router.post("/addresses", addAddress);
router.get("/addresses", getAddress);
router.put("/addresses/:addressId", updateAddress);
router.delete("/addresses/:addressId", deleteAddress);

//wishlist routes
router.post("/wishlist", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);
router.get("/wishlist", getWishlist);

export default router;