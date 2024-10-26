import { HfInference } from "@huggingface/inference";

export const hf = new HfInference(
    process.env.NEXT_PUBLIC_HUGGING_FACE_API_ACCESS_TOKEN
);
