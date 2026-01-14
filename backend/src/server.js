import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { ENV } from "../src/config/env.js";
import { connectDB } from "../src/config/db.js";
import { serve } from "inngest/express";
import { functions, inngest } from "../src/config/inngest.js";
import adminRoutes from "./routes/adminRoutes.js"

const app = express();
const __dirname = path.resolve();

app.use(clerkMiddleware());
app.use(express.json());

app.use("/api/inngest", serve({client:inngest, functions}))
app.use("/api/admin",adminRoutes)

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
