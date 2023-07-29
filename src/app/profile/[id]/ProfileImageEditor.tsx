"use client";
import UploadButton from "./UploadButton";
import { useState } from "react";
import ProfileImage from "@/components/ProfileImage";

const ProfileImageEditor = ({profileId, img}: ProfileImageEditorProps) => {
    const [url, setUrl] = useState<string | undefined>(img);

    const handleChange = async (url: string) => {
        const res = await fetch(`/api/edit-pfp-img/${profileId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (res.status >= 300) {
            const json = await res.json();
            alert(json.message);
            return;
        }

        setUrl(url);
        alert("Profile picture updated!");
    };


    return (
        <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
                <ProfileImage
                    className="img-account-profile rounded-circle mb-2"
                    url={url}
                    width={300}
                    height={300}
                />
                <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                </div>
                <UploadButton onSuccess={(e) => handleChange(e)} />
            </div>
        </div>
    );
};

export default ProfileImageEditor;

interface ProfileImageEditorProps {
    profileId: string;
    img: string;
}