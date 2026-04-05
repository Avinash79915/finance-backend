import express from "express";
import { getSummary  } from "../controllers/summary.controller.js";
import { authorizeRoles  } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/summary", authorizeRoles('admin', 'analyst','viewer'), getSummary);

export default router;