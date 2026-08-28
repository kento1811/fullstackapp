import Dexie from "dexie"

export const db = new Dexie("ChatAppDB");

db.version(1).stores({
    message: "id, conversation_id, Send_at",
    conversation: "id, created_at"
})

export async function clearLocalCache() {
  await db.message.clear();
  await db.conversation.clear();
}

export async function limitCachedMessages(conversation_id) {
    const messages = await db.message
        .where("conversation_id")
        .equals(conversation_id)
        .sortBy("created_at");

    if (messages.length <= 50) {
        return;
    }

    const oldMessages = messages.slice(0, messages.length - 50);

    await db.message.bulkDelete(
        oldMessages.map(message => message.id)
    );
}