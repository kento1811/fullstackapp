import express from "express";
import { authenticateToken, authenticateAdmin } from "../middlewares/authMiddleware.js";
import checkConversationMember from "../middlewares/checkConversationMember.js";
import  {sentMessage, getMessages, getConversations, deleteAdminMessage} from "../controllers/messageController.js";

const router = express.Router();

router.get(
    "/conversation",
    authenticateToken,
    getConversations
);

router.post(
    "/conversation/:conversation_id/message",
    authenticateToken,
    checkConversationMember,
    sentMessage
)

router.get(
    "/conversation/:conversation_id/message",
    authenticateToken,
    checkConversationMember,
    getMessages
);

router.get(
    "/conversation/delete/admin",
    authenticateAdmin,
    deleteAdminMessage
)

export default router;