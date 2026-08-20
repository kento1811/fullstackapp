import supabase from "../config/supabase.js";

export default async function checkConversationMember(req, res, next) {
    const userId = req.user.id;
    const conversationId = req.params.conversation_id;

    if (!conversationId) {
        return res.status(400).json({
            error: "conversation_id is required"
        });
    }

    const { data, error } = await supabase
        .from("conversations_member")
        .select("id, conversation_id")
        .eq("id", userId)
        .eq("conversation_id", conversationId)
        .maybeSingle();

    if (error) {
        console.error("Error checking conversation member:", error);

        return res.status(500).json({
            error: "Internal Server Error"
        });
    }

    if (!data) {
        return res.status(403).json({
            error: "you are not member of this conversation"
        });
    }

    next();
}