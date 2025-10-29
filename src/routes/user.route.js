import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeRoles("admin"), getAllUsers);

export default router;
