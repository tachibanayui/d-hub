"use client";
import { useSession } from "@/reexports/nextAuthReact";
import { toast } from "@/reexports/reactToasify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    AiFillDelete,
    AiFillDislike,
    AiFillEdit,
    AiFillExclamationCircle,
    AiFillLike,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const likePost = async (postId: string) => {
    return await fetch(`/api/post/${postId}/like`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const unlikePost = async (postId: string) => {
    return await fetch(`/api/post/${postId}/like`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const dislikePost = async (postId: string) => {
    return await fetch(`/api/post/${postId}/dislike`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const undislikePost = async (postId: string) => {
    return await fetch(`/api/post/${postId}/dislike`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const PostContentAction = ({
    initalDislikes,
    initalLikes,
    postId,
    postAuthorId,
}: PostContentActionProps) => {
    const router = useRouter();

    const session = useSession();
    const userId = session.data?.user.id;
    const role = session.data?.user.role;

    const [isLoading, setLoading] = useState(false);
    const [likes, setLikes] = useState(initalLikes);
    const [dislikes, setDislikes] = useState(initalDislikes);

    const handleLikeClick = async () => {
        setLoading(true);
        try {
            if (session.status !== "authenticated") return;
            if (!userId) return;

            if (likes.includes(userId)) {
                const res = await unlikePost(postId);
                const json = await res.json();
                if (res.status >= 300) {
                    toast.error(json.message);
                    return;
                }

                setLikes(json.likes);
            } else {
                const res = await likePost(postId);
                const json = await res.json();
                if (res.status >= 300) {
                    toast.error(json.message);
                    return;
                }

                setLikes(json.likes);
            }

            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDislikeClick = async () => {
        setLoading(true);
        try {
            if (session.status !== "authenticated") return;
            if (!userId) return;

            if (dislikes.includes(userId)) {
                const res = await undislikePost(postId);
                const json = await res.json();
                if (res.status >= 300) {
                    toast.error(json.message);
                    return;
                }

                setDislikes(json.dislikes);
            } else {
                const res = await dislikePost(postId);
                const json = await res.json();
                if (res.status >= 300) {
                    toast.error(json.message);
                    return;
                }

                setDislikes(json.dislikes);
            }

            setLoading(false);
        } catch (error) {
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const rs = await fetch('/api/post/' + postId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await rs.json();
            if (json.success) {
                toast.success("Post deleted successfully.");
                router.refresh();
            } else {
                toast.error(json.message);
            }
        } catch (e) {
            toast.error("Something went wrong. Please try again later.");
        }
    }

    return (
        <div className="d-flex gap-1 flex-row-reverse">
            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={isLoading}
                >
                    <BsThreeDots />
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <a className="dropdown-item" href="#">
                            <AiFillExclamationCircle /> Report
                        </a>
                    </li>
                    {/* <li>
                        <button className="dropdown-item" onClick={handleEdit}>
                            <AiFillEdit /> Edit
                        </button>
                    </li> */}
                    
                    {(role! >= 2 || userId === postAuthorId) && (
                        <li>
                            <button className="dropdown-item" onClick={handleDelete}>
                                <AiFillDelete /> Delete
                            </button>
                        </li>
                    )}
                </ul>
            </div>

            <div className="input-group" style={{ width: "unset" }}>
                <button
                    className="btn btn-primary"
                    disabled={isLoading}
                    onClick={handleDislikeClick}
                >
                    <AiFillDislike />{" "}
                    <span className="d-none d-lg-inline">Dislike</span>
                </button>
                <span className="input-group-text">{dislikes.length}</span>
            </div>

            <div className="input-group" style={{ width: "unset" }}>
                <button
                    className="btn btn-primary"
                    onClick={handleLikeClick}
                    disabled={isLoading}
                >
                    <AiFillLike />{" "}
                    <span className="d-none d-lg-inline">Like</span>
                </button>
                <span className="input-group-text">{likes.length}</span>
            </div>
        </div>
    );
};

export default PostContentAction;

export interface PostContentActionProps {
    initalLikes: string[];
    initalDislikes: string[];
    postId: string;
    postAuthorId: string;
}
