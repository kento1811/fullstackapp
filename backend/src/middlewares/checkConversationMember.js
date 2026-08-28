import supabase from "../config/supabase.js";

export default async function checkConversationMember(req, res, next) {
    const user_id = req.user.id;
    const conversation_id = req.params.conversation_id;

    if (!conversation_id) {
        return res.status(400).json({
            error: "conversation_id is required"
        });
    }

    const { data, error } = await supabase
        .from("conversation_member")
        .select("id, conversation_id")
        .eq("id", user_id)
        .eq("conversation_id", conversation_id)
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