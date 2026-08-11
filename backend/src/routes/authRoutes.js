import express from "express";
import {registerUser, loginUser,logoutUser, refreshToken} from "../controllers/authController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);

router.get("/me", authenticateToken, (req, res) => {
    res.json({
        message : "Authenticated user",
        user : req.user
    })
});

export default router;