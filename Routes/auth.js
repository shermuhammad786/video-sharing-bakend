import express from "express"
import { googleAuth, signout, signup, singin } from "../Controllers/auth.js";
const router = express.Router();

//CREATE USER 
router.post("/singup", signup)

//SINGIN USER
router.post("/singin", singin)

//LOG OUT
router.post("/signout", signout)

//GOOGLE AUTH
router.post("/google", googleAuth)



export default router