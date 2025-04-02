// "use client";
// import { useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";

// import type { Message as AIMessage } from "ai";
// import { useChat } from "@ai-sdk/react";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import { updateChat } from "@/app/server-actions/updateChat";

// import Transcript from "./Transcript";

// import { Message } from "@/types";

// export default function Chat({
//   id = null,
//   messages: initialMessages = [],
// }: {
//   id?: number | null;
//   messages?: Message[];
// }) {
//   const { messages, input, handleInputChange, handleSubmit, isLoading } =
//     useChat({
//       initialMessages: initialMessages as unknown as AIMessage[],
//     });
//   const chatId = useRef<number | null>(id);

//   const router = useRouter();
//   useEffect(() => {
//     (async () => {
//       if (!isLoading && messages.length) {
//         console.log("Messages updated in chat:", messages);
//         const simplifiedMessages = messages.map((message) => ({
//           role: message.role as "user" | "assistant",
//           content: message.content,
//         }));
//         const newChatId = await updateChat(chatId.current, simplifiedMessages);
//         if (chatId.current === null) {
//           router.push(`/chats/${newChatId}`);
//           router.refresh();
//         } else {
//           chatId.current = newChatId;
//         }
//       }
//     })();
//   }, [isLoading, messages, router]);

//   return (
//     <div className="flex flex-col">
//       <Transcript messages={messages as Message[]} truncate={false} />
//       <form className="flex mt-3" onSubmit={handleSubmit}>
//         <Input
//           className="flex-grow text-xl"
//           placeholder="Question"
//           value={input}
//           onChange={handleInputChange}
//           autoFocus
//         />
//         <Button type="submit" className="ml-3 text-xl">
//           Send
//         </Button>
//       </form>
//     </div>
//   );
// }

"use client";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getCompletion } from "@/app/server-actions/getCompletion";
import { useRouter } from "next/navigation";
import Transcript from "./Transcript";

interface Message {
  role: "user" | "assistant";
  content: string;
}
function Chat({
  id = null,
  messages: initialMessages = [],
}: {
  id?: number | null;
  messages?: Message[];
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [message, setMessage] = useState("");

  const chatId = useRef<number | null>(id);

  const router = useRouter();

  const onClick = async () => {
    const completions = await getCompletion(chatId.current, [
      ...messages,
      {
        role: "user",
        content: message,
      },
    ]);

    if (!chatId.current) {
      router.push(`/chats/${completions.id}`);
      router.refresh();
    }
    chatId.current = completions.id;

    setMessage("");
    setMessages(completions.messages);
  };
  return (
    <div className="flex flex-col">
      <Transcript messages={messages} truncate={false} />

      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Question"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              console.log(e.key);
              onClick();
            }
          }}
        />
        <Button onClick={onClick} className="ml-3 text-xl">
          Send
        </Button>
      </div>
    </div>
  );
}

export default Chat;
