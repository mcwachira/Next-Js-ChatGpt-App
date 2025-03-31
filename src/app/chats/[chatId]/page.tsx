import React from 'react';
import {redirect, notFound} from "next/navigation"
import {getChat} from "@/db";
import Chat from "@/app/components/Chat";
import {auth} from "@/auth"



// export const dynamic = "force-dynamic"
export default async function ChatDetail({
                                             params,
                                         }: {
    params:Promise<{ chatId: string }>;
}) {

 
    const {chatId} = await params;
    console.log("chat id is :", chatId)
    const chat = await getChat(+chatId);


    if (!chat) {
        return notFound();
      }


      console.log(chat);


    if(!auth || chat?.user_email !== auth?.user?.email){
        return redirect("/")
    }
    return (
        <main className="pt-5">
            <Chat id={+chatId} key={chatId} messages={chat?.messages ||[]} />
        </main>
    );
}