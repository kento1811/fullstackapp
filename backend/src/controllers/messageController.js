import supabase from "../config/supabase.js";

export async function getConversations(req,res){
    const sentId = req.user.id;

    const { data, error } = await supabase
        .from("conversations_member")
        .select("*")
        .eq("id", sentId)
        .order("Joined_at", { ascending: true });

    
    if(error){
        console.log("Error while sending messages", error)

        return res.status(500).json({
            error: "Internal sever error"
        })
    }

    const respone = data.map(conversation => conversation.conversation_id);
    return res.status(200).json({
        data: respone
    });
}

export async function sentMessage(req, res){
    const sentId = req.user.id;
    const {conversation_id, content} = req.body;

    if(!content || content.trim() === ""){
        return res.status(400).json({
            error: "content must not be empty!"
        })
    }

    const {data , error} = await supabase
    .from("messages")
    .insert({
        sent_id : sentId,
        conversations_id : conversation_id,
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
    const conversationId = req.params.conversation_id;

    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversations_id", conversationId)
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