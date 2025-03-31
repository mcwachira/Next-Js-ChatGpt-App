import React from 'react';
import {getChat} from "@/db";
import Chat from "@/app/components/Chat";


export default async function ChatDetail({
                                             params: { chatId },
                                         }: {
    params: { chatId: string };
}) {
    const chat = await getChat(+chatId);

    console.log(chat?.messages);
    return (
        <main className="pt-5">
            <Chat id={+chatId} key={chatId} messages={chat?.messages ||[]} />
        </main>
    );
}