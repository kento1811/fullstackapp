
import supabase from "../config/supabase.js";

export async function getConversations(req,res){
    const sentId = req.user.id;

    const { data, error } = await supabase
        .from("conversation_member")
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
    const user_id = req.user.id;
    const conversation_id = req.params.conversation_id;

    const content = req.body.content;
    console.log(req.params.conversation_id);
    console.log(req.body.content);

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
        
        console.log(data.data);

        return res.status(200).json({
            data: data
        });

    } catch(error){
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}