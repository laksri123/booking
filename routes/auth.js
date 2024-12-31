import express from "express";
import {check, logout, register} from "../controllers/auth.js"
import {login} from "../controllers/auth.js"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", logout);
router.get("/check", check);
export default router;