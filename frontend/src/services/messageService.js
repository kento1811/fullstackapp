import { apiFetch } from "./api.js";
import {db, limitCachedMessages} from "./db.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function getConversation() {
    const response = await apiFetch(
        `${API_URL}/api/conversation`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Get Conversation failed");
    }

    return { response, data };
}

export async function getMessage(conversation_id, onCacheLoaded = null) {
    if (!conversation_id) {
        throw new Error("Need conversations id");
    }
    const cachedMessages = await db.message
        .where("conversation_id")
        .equals(conversation_id)
        .sortBy("Send_at");

    if (cachedMessages.length > 0 && typeof onCacheLoaded === "function") {
        onCacheLoaded(cachedMessages);
    }

    const response = await apiFetch(
        `${API_URL}/api/conversation/${conversation_id}/message`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Get messages failed");
    }

    if (data.data && data.data.length > 0) {
        await db.message.bulkPut(data.data);
        await limitCachedMessages(conversation_id);
    }

    return { response, data };
}

export async function sendMessageViaSocket(socket, conversation_id, content, senderId) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        throw new Error("WebSocket chưa sẵn sàng");
    }

    socket.send(JSON.stringify({
        type: "sent_message",
        conversation_id: conversation_id,
        data: content
    }));

    const response = await apiFetch(
        `${API_URL}/api/conversation/${conversation_id}/message`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    const tempMessage = data.data[data.data.length - 1];
    await db.message.put(tempMessage);
    await limitCachedMessages(conversation_id);

    return tempMessage;
}