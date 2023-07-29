"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const UploadButton = ({onSuccess, isSaving}: UploadButtonProps) => {
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
                        disabled={isSaving}
                    >
                        {isSaving && (
                            <span
                                className="spinner-grow spinner-grow-sm me-2"
                                aria-hidden="true"
                            />
                        )}
                        <span>{isSaving ? "Saving..." : "Upload an Image"}</span>
                    </button>
                );
            }}
        </CldUploadWidget>
    );
}
 
export default UploadButton;

export interface UploadButtonProps { 
    onSuccess?(url: string): void;
    isSaving?: boolean;
}