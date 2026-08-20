import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import checkConversationMember from "../middlewares/checkConversationMember.js";
import  {sentMessage, getMessages, getConversations} from "../controllers/messageController.js";

const router = express.Router();

router.get(
    "/conversations",
    authenticateToken,
    getConversations
);

router.post(
    "/conversations/:conversation_id/messages",
    authenticateToken,
    checkConversationMember,
    sentMessage
)

router.get(
    "/conversations/:conversation_id/messages",
    authenticateToken,
    checkConversationMember,
    getMessages
);

export default router;