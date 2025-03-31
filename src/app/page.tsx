import Chat from "@/app/components/Chat";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/auth";
import PreviousChats from "@/app/components/PreviousChat";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>

      {!session?.user?.email && (
        <div>You need to be logged in to use this chat</div>
      )}

      {session?.user?.email && (
        <>
          <Suspense fallback={<div> Loading Previous Chats ...</div>}>
            <PreviousChats />
          </Suspense>

          <Separator className="my-5" />
          <h4 className="mt-5 text-2xl font-bold">New Chat Session</h4>
          <Chat />
        </>
      )}
    </main>
  );
}
