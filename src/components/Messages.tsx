import { Message } from "@/Types/Types";
import React from "react";
import { SingleMessage } from "./SingleMessage";
interface MessagesInterface {
    messages: Message[];
}
const Messages = ({ messages }: MessagesInterface) => {
    return (
        <div className=" h-auto w-full  flex flex-col gap-10">
            {messages.map((message) => (
                <SingleMessage key={message.id} message={message} />
            ))}
        </div>
    );
};

export default Messages;
