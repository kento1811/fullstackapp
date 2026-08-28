import { WebSocketServer } from "ws";
import supabase from "../config/supabase.js";
import jwt from "jsonwebtoken";

export function setupWebSocket(server) {
    const wss = new WebSocketServer({
        server
    });

    const rooms = new Map();

    wss.on("connection", (socket, request) => {
        
        const url = new URL(
        request.url,
        "http://localhost"
        );

        const token = url.searchParams.get("token");

        if (!token) {
            socket.close();
            return;
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            socket.user = decoded;

            console.log(
                "User connected:",
                socket.user.id
            );
        } catch (error) {
            console.log("Invalid token");
            socket.close();
            return;
        }

        socket.on("message", async (message) => {
            const data = JSON.parse(message.toString());

            if(data.type == "join_conversation"){
                const user_id = socket.user.id;

                const { data : member, error } = await supabase
                .from("conversation_member")
                .select("id, conversation_id")
                .eq("id", user_id)
                .eq("conversation_id", data.conversation_id)
                .maybeSingle();
                
                if(error){
                    console.error(error);
                    return;
                }

                if(!member){
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "You are not a member of this conversation"
                    }));
                    return;
                }

                if(!rooms.has(data.conversation_id)){
                    rooms.set(data.conversation_id, new Set());
                }

                const room = rooms.get(data.conversation_id);
                if(!room.has(socket)){
                    console.log("successfull joined converstation ", data.conversation_id);
                    room.add(socket);
                }

                socket.send(JSON.stringify({
                    type: "joined_conversation",
                    conversation_id: data.conversation_id
                }));
            }
            
            if(data.type == "sent_message"){
                const room = rooms.get(data.conversation_id);
                if(room == null){
                    console.error("No conversations exit");
                    return;
                }
                if(!room.has(socket)){
                    console.error("you are not a member of this conversations");
                    return;
                }
                if(!data.data || data.data.trim() === ""){
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "content must not be empty!"
                    }));
                    return;
                }
                const sent_id = socket.user.id;
                const { data: messageData, error } = await supabase
                    .from("message")
                    .insert({
                        sent_id: sent_id,
                        conversation_id: data.conversation_id,
                        content: data.data.trim()
                    })
                    .select()
                    .single();
                if(error){
                    console.error("Error while sending messages", error);
                    socket.send(JSON.stringify({
                        type: "error",
                        message: "Internal server error"
                    }));
                    return;
                }
                for(const client of room){
                    client.send(JSON.stringify({
                        type: "new_message",
                        conversation_id: data.conversation_id,
                        data: messageData
                    }));
                }
            }
        });

        socket.on("close", () => {
            console.log("Client disconnected");

            for (const [conversation_id, room] of rooms) {
                room.delete(socket);

                if (room.size === 0) {
                    rooms.delete(conversation_id);
                }
            }
        });
    });

    return wss;
}