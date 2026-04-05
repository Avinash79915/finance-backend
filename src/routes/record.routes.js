import express from "express";
import { createRecord,updateRecord,deleteRecord ,getAllRecords,restoreRecord} from "../controllers/record.controller.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post('/records', authorizeRoles('admin'), createRecord);
router.get('/records', authorizeRoles('admin', 'analyst'), getAllRecords);

router.patch('/records/:id', authorizeRoles('admin'), updateRecord);
router.delete('/records/:id', authorizeRoles('admin'), deleteRecord);

router.patch('/records/:id/restore', authorizeRoles('admin'), restoreRecord);

export default router;