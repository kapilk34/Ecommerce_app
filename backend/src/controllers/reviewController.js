import { Order, order } from "../models/orderModel.js";

export async function createReview(req, res) {
    try {
        const { productId, orderId, rating } =req.body;

        if(!rating || rating < 1 || rating > 5){
            return res.status(400).json({error: "Rating must be between 1 to 5"});
        }

        const user = req.user;

        //verify order exists and is delivered
        const order = await Order.findById(orderId);

        if(!order){
            return res.status(404).json({error: "Order not found!"})
        }

        if(order.clerkId !== user.clerkId){
            return res.status(403).json({error:"Not authorized to review this order"});
        }

        if(order.status !== "delivered"){
            return res. status(400).json({error: " can only reviered orders"});
        }

        //verify product is in the order
        const productIdOrder = order.orderItems.find(
            (item) => item.product.toString() === productId.toString()
        );

        if(!productIdOrder){
            return res.status(404).json({error:"Product not found in this order"});
        }

        //check if review already exists
        const existingReview = await createReview.findOne({productId, userId: user._id});
        if(existingReview){
            return res.status(400).json({error:"You have reviewed this product"});
        }

        const review = await Review.create({
            productId,
            userId: user._id,
            orderId,
            rating,
        });

        //update the product rating with atomic aggregation
        const reviews = await review.find({ productId });
        const totalRating = reviews.reduce(( sum, rev) => sum + rev.rating, 0);
        const updateProduct  = await Product.findByIdAndUpdate(
            productId,
            {
                averageRating: totalRating / reviews.length,
                totalReviews: reviews.length,
            },
            { new: true, runValidators: true}
        );

        if(!updateProduct){
            await Review.findByIdAndDelete(review._id);
            return res.status(404).json({error:"Product not found"});
        }

        res.status(201).json({message: "Review submitted successfully", review});
    } catch (error) {
        console.error("Error in creatingReview controller:", error);
        res.status(500).json({error:"Internal server error"});
    }
}

export async function deleteReview(req, res) {
    try {
        const { reviewId } = req.params;

        const user = req.user;

        const review = await Review.findById(reviewId);
        if(!review){
            return res.status(404).json({ error:"Review not found"});
        }

        if(review.userId.toString() !== user._id.toString()){
            return res.status(401).json({error:"Not authorized to delete this review"});
        }

        const productId = review.productId;
        await review.findByIdAndDelete(reviewId);

        const reviews = await review.find({ productId });
        const totalRating = reviews.reduce((sum, rev) => sum + rev.rating, 0);
        await Product.findByIdAndDelete(productId, {
            averageRating: reviews.length > 0 ? totalRating / reviews.length : 0,
            totalReviews: reviews.length,
        });

        res.status(200).json({ message: "Review deleted successfully"});
    } catch (error) {
        console.error("Error in deleteReview controller:", error);
        res.status(500).json({error:"Internal server error"});
    }
}