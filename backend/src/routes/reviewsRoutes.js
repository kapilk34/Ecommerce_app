import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createReview, deleteReview } from "../middleware/authMiddleware.js"

const router = Router();

router.post("/", protectRoute, createReview);
router.delete("/:reviewId", protectRoute, deleteReview);

export default router;