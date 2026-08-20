import Sidebar from "../../components/sidebar";
import "./Conversations.css";
import { getConversation, getMessage } from "../../services/messageService";
import { useAuth } from "../../contexts/authContext.jsx";
import { useState, useEffect } from "react";
export default function Conversations(){
    const [conversations,setConversations] = useState([]);
    const [activeConversation,setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput,setMessageInput] = useState("");
    const {user,socket} = useAuth();
    const getConversations = async () => {
        try {
            const { response, data } = await getConversation();
            if (!response.ok) {
                console.error("Error during get conversation:", data.error);
                return;
            }
            setConversations(data.data);
        } catch (error) {
            console.error("error during get conversation", error);
        }
    };
    const getMessages = async () => {
        if(!activeConversation) {
            return;
        }
        try{
            const {response, data} = await getMessage(activeConversation);
            if (!response.ok) {
                console.error("Error during get conversation:", data.error);
                return;
            }
            console.log(data);
            setMessages(data.data);
        } catch(error){
            console.error("error during get messages", error);
        }
    }
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageInput.trim()) {
            return;
        }
        if (!activeConversation) {
            return;
        }
        if (!socket) {
            return;
        }
        if (socket.readyState !== WebSocket.OPEN) {
            return;
        }
        socket.send(JSON.stringify({
            type: "sent_message",
            conversation_id: activeConversation,
            data: messageInput.trim()
        }));
        setMessageInput("");
    };

    useEffect(() => {
        getConversations();
    }, []);

    useEffect(() => {
        getMessages();
        if (!socket) {
            return;
        }
        if (!activeConversation) {
            return;
        }
        if (socket.readyState !== WebSocket.OPEN) {
            return;
        }
        socket.send(JSON.stringify({
            type: "join_conversation",
            conversation_id: activeConversation
        }));
    }, [activeConversation, socket]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        const handleMessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "new_message") {
                if (data.conversation_id !== activeConversation) {
                    return;
                }
                setMessages(prev => [
                    ...prev,
                    data.data
                ]);
            }
        };
        socket.addEventListener("message", handleMessage);
        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, activeConversation]);
    return(
        <div id= "conversations">
            <Sidebar activePage = "Conversations"/>
            <div id="conversationContainer"> 
                <div id="conversationsSidebar">
                    {conversations.map((conversationId,index) => (
                        <button key = {conversationId} className={`conversationsSidebar-content 
                            ${activeConversation === conversationId ? "active" : ""}`}
                            onClick={() => {setActiveConversation(conversationId)}}
                        >
                            <p>Conversation {index}</p>
                        </button>
                    ))}
                </div>
                <div id="dialogue">
                    <div id="messages">
                        {messages.map((message,index) => (
                        <p key = {message.id} className={`dialogue-content 
                            ${ user.id === message.sent_id ? "right" : "left"}
                        `}>
                            {message.content}
                        </p>
                        ))}
                    </div>
                    {activeConversation && 
                    <div id="send-message">
                        <form onSubmit={handleSendMessage}>
                            <input
                                id = "form-message"
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Write a message..."
                            />
                            <button id="send-message-button" type="submit" >
                                Send
                            </button>
                        </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}