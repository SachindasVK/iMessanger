import express from "express";
import { checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// /api/auth/check
router.get("/check", protectRoute, checkAuth);
router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

export default router;
