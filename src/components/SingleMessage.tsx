import { Message } from "@/Types/Types";
import React from "react";
interface SingleMessageInterface {
    message: Message;
}
export const SingleMessage = ({ message }: SingleMessageInterface) => {
    return (
        <div className="text-white w-full flex flex-col items-end gap-1">
            <div className="h-40 w-auto">
                <img
                    src={message.image}
                    alt="Uploaded Preview"
                    className="w-auto h-full object-contain rounded-2xl overflow-hidden"
                />
            </div>
            <div className="  bg-blue-950 px-3 py-3 rounded-2xl justify-end items-end">
                {message.messageState === "success" ? (
                    <>
                        {" "}
                        <p>
                            Image is classified as &apos;
                            {message.predictions[0].label}
                            &apos;
                        </p>
                        <p>
                            With precision score of{" "}
                            {(message.predictions[0].score * 100).toFixed(2)}%;
                        </p>
                    </>
                ) : (
                    <p
                        className={`
                    ${message.messageState === "failed" ? "text-red-500" : ""}
                    ${
                        message.messageState === "uploading"
                            ? "text-yellow-500"
                            : ""
                    }
                
                `}
                    >
                        {message.messageState}
                        {message.messageState == "uploading" ? "..." : ""}
                    </p>
                )}
            </div>
        </div>
    );
};
