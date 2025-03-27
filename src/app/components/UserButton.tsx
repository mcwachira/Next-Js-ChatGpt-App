"use client"
import React from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";


function getFirstCapitalLetters(str?:string| null){
    const match = (str || "").match(/[A-Z]/g);
    return match ? match.slice(0.,2).join("")    : "GT";
}
function UserButton() {

    const {data:session, status} = useSession()
    return (
        <div>

            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={session?.user?.image!}/>

                            <AvatarFallback>
                                {getFirstCapitalLetters(session?.user?.name)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>

                        <DropdownMenuItem onClick={() => { signOut()}}>
                            Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
            {status === "unauthenticated" && (
                <Button onClick={() => signIn()}>
                    Sign in
                </Button>

            )}
        </div>
    );
}

export default UserButton;