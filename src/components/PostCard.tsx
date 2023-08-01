import { AiFillCalendar, AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsDot, BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import pfp from "../../public/profile-placeholder.png";
import { Post } from "@/models/thread.client";
import { formatRelative } from "date-fns";
import sanitizeHtml from "sanitize-html";
import PostContentAction from "./PostContentAction";
import PostContent from "./PostContent";
import PostCardBase from "./PostCardBase";

const PostCard = ({ user, post, showActions }: PostCardProps) => {
    return (
        <PostCardBase user={user} post={post} showActions={showActions}>
            <PostContent
                initialMode="view"
                postId={post.id}
                initialPostContent={post.content}
            />
        </PostCardBase>
    );
};

export default PostCard;

export interface PostCardProps {
    user: {
        name: string;
        role: string;
        profileImg?: string;
        motto?: string;
    };
    post: Post;
    showActions?: boolean;
    isEdit?: boolean;
}
