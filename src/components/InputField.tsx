import React, { Dispatch, SetStateAction } from "react";
interface InputFieldInterface {
    inputImage: string | null;
    setInputImage: Dispatch<SetStateAction<string | null>>;
    setImageBlob: Dispatch<SetStateAction<Blob | null>>;
    onSubmit: () => void;
    loading: boolean;
}
const InputField = ({
    inputImage,
    setInputImage,
    onSubmit,
    setImageBlob,
    loading,
}: InputFieldInterface) => {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputImage(reader.result as string);
            };
            setImageBlob(file);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setInputImage(reader.result as string);
            };
            setImageBlob(file);
            reader.readAsDataURL(file);
        }
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };
    function clearInput() {
        setImageBlob(null);
        setInputImage(null);
    }
    return (
        <div className="w-full h-full  p-10  flex  justify-end items-end text-black gap-2 ">
            <div className="flex-grow text-white  rounded-md">
                {inputImage ? (
                    <div className="h-40 w-full flex justify-center items-center border border-gray-300 rounded-md p-2 relative">
                        <img
                            src={inputImage}
                            alt="Uploaded Preview"
                            className="w-auto h-full object-contain rounded-md border border-gray-300 shadow-md"
                        />
                        <div className="absolute w-full h-full  flex justify-end p-2">
                            <button
                                className="rounded-full bg-red-500 h-5 w-5 flex justify-center items-center font-mono font-thin text-xs hover:bg-red-600
                            "
                                onClick={clearInput}
                            >
                                X
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-gray-300 hover:border-blue-500 hover:text-blue-500 transition overflow-hidden"
                    >
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            className="text-center flex justify-center items-center bg-blue-500/5  h-full w-full cursor-pointer"
                        >
                            Drag and drop an image here, or click to select
                        </label>
                    </div>
                )}
            </div>
            <button
                className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none disabled:bg-blue-200 disabled:cursor-not-allowed"
                disabled={loading}
                onClick={onSubmit}
            >
                Upload
            </button>
        </div>
    );
};

export default InputField;
