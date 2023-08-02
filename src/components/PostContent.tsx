"use client";
import { useState } from "react";
import sanitizeHtml from "sanitize-html";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";


const PostContent = ({
    initialMode,
    initialPostContent,
    postId,
}: PostContentProps) => {
    const [content, setContent] = useState(initialPostContent);
    const [mode, setMode] = useState(initialMode);

    if (mode === "edit") {
        return (
            <ReactQuill value={content} onChange={(e) => setContent(e)} />
        )
    } else {
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(initialPostContent),
                }}
            />
        );
    }
};

export default PostContent;

export interface PostContentProps {
    postId: string;
    initialPostContent: string;
    initialMode: "view" | "edit";
}
