import { apiFetch } from "./api.js";

const API_URL = import.meta.env.VITE_API_URL;

export async function getConversation() {
    const response = await apiFetch(
        `${API_URL}/api/conversations`,
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
        `${API_URL}/api/conversations/${conversations_id}/messages`,
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

export async function sendMessage(conversations_id, content) {
    if (!conversations_id) {
        throw new Error("Need conversations id");
    }

    const response = await apiFetch(
        `${API_URL}/api/conversations/${conversations_id}/messages`,
        {
            method: "POST",
            body: JSON.stringify({
                conversation_id: conversations_id,
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