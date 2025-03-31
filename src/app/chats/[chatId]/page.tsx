import React from "react";
import { redirect, notFound } from "next/navigation";
import { getChat } from "@/db";
import Chat from "@/app/components/Chat";
import { auth as getServerSession } from "@/auth";

// export const dynamic = "force-dynamic";
export default async function ChatDetail({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const { chatId } = await params;

  const chat = await getChat(+chatId);

  if (!chat) {
    return notFound();
  }

  console.log("user email", chat?.name);
  const session = await getServerSession();
  // console.log(session.user);

  if (!session || chat?.user_email !== session?.user?.email) {
    return redirect("/");
  }

  return (
    <main className="pt-5">
      <Chat id={+chatId} key={chatId} messages={chat?.messages || []} />
    </main>
  );
}
