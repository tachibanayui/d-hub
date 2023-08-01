import { AiFillCalendar, AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsDot, BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import pfp from "../../public/profile-placeholder.png";
import { Post } from "@/models/thread.client";
import { formatRelative } from "date-fns";
import sanitizeHtml from "sanitize-html";
import PostContentAction from "./PostContentAction";
import PostContent from "./PostContent";
import React from "react";

const PostCardBase = ({ user, post, children, showActions }: PostCardBaseProps) => {
    return (
        <article className="row border m-0">
            <div className="col-3 bg-light  justify-content-center align-items-center p-2">
                <div className="d-flex justify-content-center">
                    <Image
                        width={150}
                        height={150}
                        src={user.profileImg ?? pfp}
                        alt="pfp"
                        className="img-fluid img-thumbnail rounded-circle"
                    />
                </div>
                <p className="mb-0 mt-3 text-center">
                    {user.name}
                    <br />
                    <span className="m-0 badge badge bg-secondary text-center">
                        {user.role}
                    </span>
                </p>
            </div>
            <div className="col-9 d-flex flex-column">
                <i
                    className="text-secondary full-height-fixed"
                    style={{ fontSize: "0.8rem" }}
                >
                    <AiFillCalendar />{" "}
                    {formatRelative(post.created, new Date())}
                </i>
                <hr className="my-1" />

                <div className="full-height-grow">{children}</div>

                {showActions && (
                    <PostContentAction
                        initalDislikes={post.dislikes}
                        initalLikes={post.likes}
                        postId={post.id}
                    />
                )}

                <hr className="my-1" />
                <div className="full-height-fixed">{user.motto}</div>
            </div>
        </article>
    );
};

export default PostCardBase;

export interface PostCardBaseProps {
    user: {
        name: string;
        role: string;
        profileImg?: string;
        motto?: string;
    };
    post: Post;
    children: React.ReactNode;
    showActions?: boolean;
    isEdit?: boolean;
}
