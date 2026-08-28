import { apiFetch } from "./api.js";

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

export async function getMessage(conversations_id) {
    if (!conversations_id) {
        throw new Error("Need conversations id");
    }

    const response = await apiFetch(
        `${API_URL}/api/conversation/${conversations_id}/message`,
        {
            method: "GET",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Get messages failed");
    }

    return { response, data };
}

export async function sendMessage(conversation_id, content) {
    if (!conversation_id) {
        throw new Error("Need conversations id");
    }

    const response = await apiFetch(
        `${API_URL}/api/conversation/${conversation_id}/message`,
        {
            method: "POST",
            body: JSON.stringify({
                content: content
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Send messages failed");
    }

    return { response, data };
}