"use client";
import UploadButton from "./UploadButton";
import { useState } from "react";
import ProfileImage from "@/components/ProfileImage";
import { toast } from "react-toastify";

const ProfileImageEditor = ({ profileId, img }: ProfileImageEditorProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [url, setUrl] = useState<string | undefined>(img);

    const handleChange = async (url: string) => {
        setIsSaving(true);
        const res = await fetch(`/api/edit-pfp-img/${profileId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const json = await res.json();
        if (res.status >= 300) {
            toast.error(json.message);
        } else {
            toast.success(json.message);
            setUrl(url);
        }

        setIsSaving(false);
    };


    return (
        <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
                <ProfileImage
                    className="img-account-profile rounded-circle mb-2 object-fit-cover"
                    url={url}
                    width={300}
                    height={300}
                />
                <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                </div>
                <UploadButton onSuccess={(e) => handleChange(e)} isSaving={isSaving} />
            </div>
        </div>
    );
};

export default ProfileImageEditor;

interface ProfileImageEditorProps {
    profileId: string;
    img: string;
}