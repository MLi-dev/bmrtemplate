import express from "express";
import path from "path";
import RecordsController from "../controllers/records.js";
import { fileURLToPath } from "url";

import eidrDataById from "../data/records.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/resolve", RecordsController.getRecordsById);
router.post("/query", RecordsController.getRecordsByQuery);
// router.post("/register", RecordsController.createEidrRecord);

// router.get('/:giftId', (req, res) => {
//   res.status(200).sendFile(path.resolve(__dirname, '../public/gift.html'))
// })

export default router;
