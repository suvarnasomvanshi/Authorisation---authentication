import express from "express";
import { getUser, login, signup, verifytoken } from "../controllers/user-controller";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifytoken,getUser);

export default router;





