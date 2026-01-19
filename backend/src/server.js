import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import { serve } from "inngest/express";
import { functions, inngest } from "../src/config/inngest.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewsRoutes from "./routes/orderRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const __dirname = path.resolve();

app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/inngest", serve({client:inngest, functions}))
app.use("/api/admin",adminRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/reviews",reviewsRoutes)
app.use("/api/products",productRoutes)

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

//make our app production ready
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../admin", "dist", "index.html")
    );
  });
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running Successfully on port ${ENV.PORT}`);
  connectDB();
});
