
import supabase from "../config/supabase.js";

export async function getConversations(req, res) {
    const userId = req.user.id;

    const { data, error } = await supabase
    .from("conversation_member")
    .select(`
            conversation_id,
            conversation (
                id,
                conversation_member (
                    id,
                    user (
                        profile (
                            profile_id,
                            name
                        )
                    )
                )
            )
        `)
    .eq("id", req.user.id)
    .order("Joined_at", { ascending: true });

    if (error) {
        console.error("Error while getting conversations:", error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }

    const response = data.map(item => ({
        conversation_id: item.conversation_id,
        members: item.conversation.conversation_member.map(member => ({
            user_id: member.id,
            ...member.user.profile[0]
        }))
    }));

    console.log("Conversations for user", userId, ":", response);

    return res.status(200).json({
        data: response
    });
}

export async function sentMessage(req, res){
    const user_id = req.user.id;
    const conversation_id = req.params.conversation_id;

    const content = req.body.content;

    if(!content || content.trim() === ""){
        return res.status(400).json({
            error: "content must not be empty!"
        })
    }

    const {data , error} = await supabase
    .from("message")
    .insert({
        sent_id : user_id,
        conversation_id : conversation_id,
        content : content.trim()
    })
    .select()
    .single()

    if(error){
        console.log("Error while sending messages", error)

        return res.status(500).json({
            error: "Internal sever error"
        })
    }

    return res.status(201).json({
        message: "Success sending data",
        data
    });
}

export async function getMessages(req, res) {
    const conversation_id = req.params.conversation_id;

    const { data, error } = await supabase
        .from("message")
        .select("*")
        .eq("conversation_id", conversation_id )
        .order("Send_at", { ascending: true });

    if (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
    return res.status(200).json({
        data
    });
}

export async function deleteAdminMessage(req,res){
    const conversation_id = process.env.ADMIN_CONVERSATION_ID;
    
    try {
        const {data, error} = await supabase
        .from("message")
        .delete()
        .eq("conversation_id", conversation_id)
        .select();

        if(error){
            console.error("error while trying to delete message ",error );
            return res.status(500).json({
                error: error
            })
        }

        return res.status(200).json({
            data: data
        });

    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}