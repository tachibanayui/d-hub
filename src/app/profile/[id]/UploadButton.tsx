"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadButton = ({onSuccess}: UploadButtonProps) => {
    const [url, setUrl] = useState();

    return (
        <CldUploadWidget
            uploadPreset="dhub-pfp"
            options={{
                maxFileSize: 5000000,
                croppingAspectRatio: 1,
            }}
            onUpload={(params: any) => {
                if (params.event === "success") {
                    const url = params?.info?.url;
                    if (url) {
                        setUrl(url);
                    }
                }
            }}
            onClose={() => onSuccess && url && onSuccess(url)}
        >
            {(params) => {
                function handleOnClick(e: any) {
                    const { open } = params;
                    e.preventDefault();
                    open();
                }
                return (
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={handleOnClick}
                    >
                        Upload an Image
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
 
export default UploadButton;

export interface UploadButtonProps { 
    onSuccess?(url: string): void;
}