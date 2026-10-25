import express from "express";
import cookieParser from "cookie-parser";

import AuthRoutes from "./auth/routes.js";
import ProductRoutes from "./product/routes.js";
import UserRoutes from "./user/routes.js";
import AdminRoutes from "./admin/routes.js";
import OrderRoutes from "./order/routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.json({ success: true, message: "api is running" });
});
app.post("/health", (req, res) => {
  return res.json({ success: true, message: "api is running" });
});

app.use("/api/auth", AuthRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/orders", OrderRoutes);

const PORT = process.env.PORT || 3000;

app.use((req, res) => {
  res.json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
