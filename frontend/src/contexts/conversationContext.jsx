import { createContext, useContext, useEffect, useState } from "react";
import { getConversation } from "../services/messageService";
import { getProfile } from "../services/profileService.js";
import { useAuth } from "./authContext.jsx";

const ConversationContext = createContext(null);

export function ConversationProvider({ children }) {

    const [conversations, setConversations] = useState([]);
    const [profile,setProfile] = useState(null);

    const { user,socket } = useAuth();
    async function loadProfile(profile_id){
            try{
                const {response, data} = await getProfile(profile_id);
                if(profile_id === "me"){
                    setProfile(data.data);
                }
                return data.data;
            }
            catch(e){
                console.log("error while get Profile", e);
                return null;
            }
        }

    const loadConversations = async () => {
        try {

            const { response, data } = await getConversation();

            if (!response.ok) {
                console.error(
                    "Error during get conversation:",
                    data.error
                );
                return;
            }
            setConversations(data.data);
            

        } catch (error) {

            console.error(
                "error during get conversation",
                error
            );

        }
    };

    useEffect(() => {
        if (!user) {
        setConversations([]);
        setProfile(null);
        } else {
            loadConversations();
            loadProfile("me");
        }
    },[user]);

    useEffect(() => {
        loadConversations();
        loadProfile("me");
    }, []);

        useEffect(() => {
        if (!socket) return;
        if (socket.readyState !== WebSocket.OPEN) return;

        conversations.forEach((conversation) => {
            socket.send(JSON.stringify({
                type: "join_conversation",
                conversation_id: conversation
            }));
        });
    }, [conversations, socket]);

    useEffect(() => {

        if (!socket) {
            return;
        }

        const handleMessage = (event) => {

            const data = JSON.parse(event.data);

            if (data.type === "new_message") {


                setConversations(prev => {

                    // TODO: sau này cập nhật last message,
                    // unread count,... ở đây

                    return prev;
                });
            }
        };

        socket.addEventListener("message", handleMessage);

        return () => {

            socket.removeEventListener(
                "message",
                handleMessage
            );

        };

    }, [socket]);

    return (
        <ConversationContext.Provider
            value={{
                conversations,
                loadConversations,
                profile,
                loadProfile
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
}

export function useConversation() {

    return useContext(ConversationContext);

}