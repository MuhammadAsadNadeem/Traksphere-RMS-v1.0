import { Router } from "express";
import locationController from "../controllers/location.controller";

const router = Router();

router.post("/send-location", locationController.receiveLocation);
router.get("/get-latest-location", locationController.getLatestLocation);


export default router;
