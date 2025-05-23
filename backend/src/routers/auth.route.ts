import { Router } from "express";
import controller from "../controllers/auth.controller";

const router = Router()

router.get("/send-otp", controller.sendOtp);
router.post("/signup", controller.signUp);
router.post("/complete-signup", controller.completeSignUp);
router.post("/signin", controller.signIn);
router.post("/forgot-password", controller.forgotPassword);
router.get("/get-stopsNames", controller.getAllStopNames)
router.post('/send-message', controller.sendMessage);
router.get('/get-messages', controller.getMessages);
router.delete('/delete-message', controller.deleteMessageById);

export default router;
