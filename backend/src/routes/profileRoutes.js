import express from "express";
import {getProfile,findProfile,updateProfile } from "../controllers/profileController.js";
import {authenticateToken} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get(
    "/search",
    findProfile
)

router.get(
    "/:profile_id",
    authenticateToken,
    getProfile
)
// router.post(
//     "/me",
//     authenticateToken,
//     ChangeOwnProfile
// )

router.patch(
    "/:profile_id",
    authenticateToken,
    updateProfile
)

export default router;