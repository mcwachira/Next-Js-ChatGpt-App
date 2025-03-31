import { Chat, ChatWithMessages, Message } from "@/types";
import { supabase } from "@/db/lib/supabase";

export async function createChat(
  userEmail: string,
  name: string,
  msgs: Message[],
) {
  // Insert the chat
  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .insert([{ user_email: userEmail, name }])
    .select("id")
    .single();

  if (chatError) {
    console.error("Error creating chat:", chatError);
    throw chatError;
  }

  const chatId = chat.id;

  // Insert messages
  if (msgs.length > 0) {
    const { error: messagesError } = await supabase.from("messages").insert(
      msgs.map((msg) => ({
        chat_id: chatId,
        role: msg.role,
        content: msg.content,
      })),
    );

    if (messagesError) {
      console.error("Error inserting messages:", messagesError);
      throw messagesError;
    }
  }

  return chatId;
}

export async function getChat(
  chatId: number,
): Promise<ChatWithMessages | null> {
  console.log(chatId);
  // Fetch chat
  const { data: chat, error: chatError } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chatId);
  // .maybeSingle()
  // console.log("Data received:", chat?.message);

  if (chatError || !chat[0]) {
    console.error("Error fetching chat:", chatError);
    return null;
  }

  // Fetch messages
  const { data: messages, error: messagesError } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId);

  if (messagesError) {
    console.error("Error fetching messages:", messagesError);
    return null;
  }

  return {
    ...chat,
    messages: messages.map((msg) => ({
      ...msg,
      role: msg.role as "user" | "assistant",
      content: msg.content,
    })),
  } as ChatWithMessages;
}

export async function getChats(userEmail: string): Promise<Chat[]> {
  const { data: chats, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_email", userEmail);

  console.log(chats);
  if (error) {
    console.error("Error fetching chats:", error);
    return [];
  }

  return chats as Chat[];
}

export async function getChatsWithMessages(
  userEmail: string,
): Promise<ChatWithMessages[]> {
  // Fetch chats
  const { data: chats, error: chatsError } = await supabase
    .from("chats")
    .select("*")
    .eq("user_email", userEmail)
    .order("timestamp", { ascending: false })
    .limit(3);

  if (chatsError) {
    console.error("Error fetching chats:", chatsError);
    return [];
  }

  // Fetch messages for each chat
  for (const chat of chats) {
    const { data: messages, error: messagesError } = await supabase
      .from("messages")
      .select("*")
      .eq("chat_id", chat.id);

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      chat.messages = [];
    } else {
      chat.messages = messages.map((msg) => ({
        ...msg,
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));
    }
  }

  return chats as ChatWithMessages[];
}

export async function getMessages(chatId: number) {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId);

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return messages.map((msg) => ({
    ...msg,
    role: msg.role as "user" | "assistant",
    content: msg.content,
  }));
}

export async function updateChat(chatId: number, msgs: Message[]) {
  // Delete existing messages for the chat
  const { error: deleteError } = await supabase
    .from("messages")
    .delete()
    .eq("chat_id", chatId);

  if (deleteError) {
    console.error("Error deleting messages:", deleteError);
    throw deleteError;
  }

  // Insert new messages in bulk (if there are any)
  if (msgs.length > 0) {
    const { error: insertError } = await supabase.from("messages").insert(
      msgs.map((msg) => ({
        chat_id: chatId,
        role: msg.role,
        content: msg.content,
      })),
    );

    if (insertError) {
      console.error("Error inserting messages:", insertError);
      throw insertError;
    }
  }
}
