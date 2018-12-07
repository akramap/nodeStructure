import express from "express";
import sampleRoutes from "./app/api/sample/route";
import userRoutes from "./app/api/user/route";
import postRoutes from "./app/api/posts/route";
import commentRoutes from "./app/api/comments/route";
import roleRoutes from "./app/api/role/route";
import permissionRoutes from "./app/api/permissions/route";

const router = express.Router();

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

// mount sample routes at /sample
router.use("/sample", sampleRoutes);
router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);
router.use("/role", roleRoutes);
router.use("/permission", permissionRoutes);
export default router;
