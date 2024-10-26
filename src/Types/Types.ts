export type Prediction = {
    label: string;
    score: number;
};
export type Message = {
    id: number;
    image: string;
    predictions: Prediction[];
    messageState: "uploading" | "failed" | "success";
};
