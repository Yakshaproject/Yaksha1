import express from "express";
import { login, logout, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register)
router.post("/login", login) 
router.post("/logout", logout)
router.get('/validate-token', verifyToken, (req, res) => {
    res.status(200).send({userId: req.userId})
})



export default router;