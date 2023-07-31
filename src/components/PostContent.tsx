import ThreadHero from "@/components/ThreadHero";
import {
    AiFillCalendar,
    AiFillEye,
    AiOutlineExclamationCircle,
    AiOutlineShareAlt,
} from "react-icons/ai";
import { BsDot, BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import pfp from "../../public/profile-placeholder.png";
import { Post } from "@/models/thread.client";
import { formatRelative } from "date-fns";
import sanitizeHtml from "sanitize-html";

const PostContent = ({ user, post }: PostContentProps) => {
    return (
        <article className="row border m-0">
            <div className="col-2 bg-light d-flex flex-column justify-content-center align-items-center align-self-start p-2">
                <Image
                    width={150}
                    height={150}
                    src={user.profileImg ?? pfp}
                    alt="pfp"
                    className="img-fluid img-thumbnail rounded-circle"
                />
                <p className="mb-0 mt-3">{user.username}</p>
                <span className="m-0 badge badge bg-secondary">
                    {user.role}
                </span>
            </div>
            <div className="col-10 d-flex flex-column">
                <i className="text-secondary full-height-fixed" style={{fontSize: '0.8rem'}}>
                    <AiFillCalendar />{" "}
                    {formatRelative(post.created, new Date())}
                </i>
                <hr className="my-1" />

                <div
                    className="full-height-grow"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
                ></div>

                <hr className="my-1" />
                <div className="full-height-fixed">{user.motto}</div>
            </div>
        </article>
    );
};

export default PostContent;

export interface PostContentProps { 
    user: {
        username: string;
        role: string;
        profileImg?: string;
        motto?: string;
    },
    post: Post
}