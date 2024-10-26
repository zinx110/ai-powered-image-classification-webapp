"use client";
import InputField from "@/components/InputField";

import Messages from "@/components/Messages";
import { Message, Prediction } from "@/Types/Types";
import { useState } from "react";
import { hf } from "../utils/huggingFace";
export default function Home() {
    const [inputImage, setInputImage] = useState<string | null>(null);
    const [imageBlob, setImageBlob] = useState<Blob | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    async function sendImage() {
        setError("");
        if (!imageBlob || !inputImage) {
            setError("Please select an image to upload");
            return;
        }
        const id = messages.length;
        try {
            setMessages((prev) => [
                ...prev,
                {
                    id,
                    image: inputImage,
                    predictions: [],
                    messageState: "uploading",
                },
            ]);
            setInputImage(null);
            setImageBlob(null);
            setLoading(true);
            const res = await hf.imageClassification({
                data: imageBlob,
                model: "google/vit-base-patch16-224",
            });
            const predictions = res as Prediction[];
            if (predictions.length === 0) {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === id
                            ? {
                                  ...msg,
                                  messageState: "failed",
                              }
                            : msg
                    )
                );
            }
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === id
                        ? {
                              ...msg,
                              messageState: "success",
                              predictions: predictions,
                          }
                        : msg
                )
            );
            setLoading(false);
        } catch (error) {
            setError("Error getting response from hugging face");
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === id
                        ? {
                              ...msg,
                              messageState: "failed",
                          }
                        : msg
                )
            );
            console.error("error in sendImage ", error);
            setLoading(false);
        }
    }
    return (
        <div className="grid grid-rows-[60px_1fr_220px] items-center justify-items-center min-h-screen p-20 py-10  sm:p-x-20 font-[family-name:var(--font-geist-sans)] w-full max-w-5xl ">
            <header className="flex flex-col row-start-1 justify-center items-center ">
                <h1 className="text-3xl">Image Classification Bot</h1>
                <p>Using Hugging Face Api</p>
            </header>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full   p-10">
                <Messages messages={messages} />
            </main>
            <footer className="row-start-3 flex flex-col gap-1 flex-wrap items-center justify-center w-full   pb-10">
                <p className="text-red-600 font-bold">{error}</p>
                <InputField
                    loading={loading}
                    onSubmit={sendImage}
                    inputImage={inputImage}
                    setInputImage={setInputImage}
                    setImageBlob={setImageBlob}
                />
            </footer>
        </div>
    );
}
