"use client";
import ReactQuillNext from "@/reexports/ReactQuillNext";
import upload from "@/utils/cloudinary";
import { useCallback, useRef } from "react";
import "react-quill/dist/quill.snow.css";

const QuillPost = ({ content, setContent }: QuillPostProps) => {
    const reactQuillRef = useRef<any>(null);
    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const url = await upload(file);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range &&
                        quill
                            .getEditor()
                            .insertEmbed(range.index, "image", url);
                }
            }
        };
    }, []);

    return (
        <>
            <ReactQuillNext
                innerRef={reactQuillRef}
                placeholder="Write your post here..."
                theme="snow"
                value={content}
                onChange={(x) => setContent(x)}
                modules={{
                    toolbar: {
                        container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            [
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                            ],
                            [
                                { list: "ordered" },
                                { list: "bullet" },
                                { indent: "-1" },
                                { indent: "+1" },
                            ],
                            ["link", "image"],
                            ["code-block"],
                            ["clean"],
                        ],
                        handlers: {
                            image: imageHandler,
                        },
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
            />
        </>
    );
};

export default QuillPost;
export interface QuillPostProps {
    content: string;
    setContent(e: string): void;
}
