import Sidebar from "../../components/sidebar";
import "./Conversations.css";
import { getMessage, sendMessageViaSocket } from "../../services/messageService";
import { useConversation } from "../../contexts/conversationContext.jsx";
import { useAuth } from "../../contexts/authContext.jsx";
import Loading from "../../components/Loading.jsx";
import { useState, useEffect,useRef } from "react";
export default function Conversations(){
    const [activeConversation,setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageInput,setMessageInput] = useState("");
    const {user,socket} = useAuth();
    const { conversations } = useConversation();
    const messagesEndRef = useRef(null);

    const getMessages = async () => {
        if(!activeConversation) {
            return;
        }
        try{
            setLoading(true);
            const { response, data } = await getMessage(
                activeConversation, 
                (cachedData) => {
                    setMessages(cachedData); 
                    setLoading(false);  
                }
            );
            if (!response.ok) {
                console.error("Error during get conversation:", data.error);
                return;
            }
            setMessages(data.data);
            setLoading(false);
        } catch(error){
            console.error("error during get messages", error);
        }
    }
    const handleSendMessage = async (e) => {
        e.preventDefault();
        const content = messageInput.trim();
        setMessageInput("");

        if (!content || !activeConversation) return;

        try {
            const newMessage = {
                id: crypto.randomUUID(),
                sent_id:user.id,
                content:content,
            }
            setMessages((prev) =>[
                ...prev,
                newMessage
            ])

            const tempMsg = await sendMessageViaSocket(socket, activeConversation, content, user.id);


           
        } catch (error) {
            console.error("Lỗi gửi tin nhắn:", error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "instant"
        });
    };

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
    }, [activeConversation]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        const handleMessage = async (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "new_message") {
                if (data.conversation_id !== activeConversation) {
                    return;
                }
                await getMessages();
            }
        };
        socket.addEventListener("message", handleMessage);
        return () => {
            socket.removeEventListener("message", handleMessage);
        };
    }, [socket, activeConversation]);

    useEffect(() => {
        scrollToBottom();
    },[messages]);

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
                    {loading ? 
                        <div className="loading">
                            <Loading></Loading>
                        </div>
                    :
                        <div id="messages">
                            {messages.map((message,index) => (
                            <p key = {message.id} className={`dialogue-content 
                                ${ user.id === message.sent_id ? "right" : "left"}
                            `}>
                                {message.content}
                            </p>
                            ))}

                            <div ref={messagesEndRef}></div>
                        </div>
                    }
                    
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