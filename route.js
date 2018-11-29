import express from "express";
import sampleRoutes from "./app/api/sample/route";
import userRoutes from "./app/api/user/route";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// mount sample routes at /sample
router.use("/sample", sampleRoutes);
router.use("/user", userRoutes);
export default router;
