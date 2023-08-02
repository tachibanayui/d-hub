"use client";
import { AiOutlineSend } from "react-icons/ai";
import PostCard, { PostCardProps } from "./PostCard";
import PostCardBase from "./PostCardBase";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/reexports/reactToasify";

const NewPostEditor = ({ user, threadId }: NewPostEditorProps) => {
    const router = useRouter();
    const [isPosting, setPosting] = useState(false);
    const [content, setContent] = useState("");

    const handlePost = async () => {
        try {
            setPosting(true);
            const res = await fetch(`/api/thread/${threadId}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ content }),
            });

            const json = await res.json();

            if (res.status >= 300) {
                toast.error(json.message);
            } else {
                toast.success(json.message);
                setContent("");
                router.refresh();
            }
        } catch (e) {
            toast.error("Something went wrong, try again later");
        } finally {
            setPosting(false);
        }
    };

    return (
        <PostCardBase
            user={user}
            showActions={false}
            isEdit={true}
            post={{
                content: "",
                created: new Date(),
                dislikes: [],
                id: "",
                likes: [],
                threadId,
                userId: "",
            }}
        >
            <div>
                <ReactQuill
                    placeholder="Write your post here..."
                    theme="snow"
                    value={content}
                    onChange={(x) => setContent(x)}
                />
                <button
                    className="btn btn-primary mt-2"
                    style={{ float: "right" }}
                    onClick={handlePost}
                >
                    {isPosting ? (
                        <span
                            className="spinner-grow spinner-grow-sm me-2"
                            aria-hidden="true"
                        />
                    ) : (
                        <AiOutlineSend />
                    )}
                    Submit
                </button>
            </div>
        </PostCardBase>
    );
};

export default NewPostEditor;

export interface NewPostEditorProps {
    user: PostCardProps["user"];
    threadId: string;
}
