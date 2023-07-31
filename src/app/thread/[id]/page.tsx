import ThreadHero from "@/components/ThreadHero";
import {
    AiFillCalendar,
    AiFillEye,
    AiOutlineExclamationCircle,
    AiOutlineShareAlt,
} from "react-icons/ai";
import { BsDot, BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import pfp from "../../../../public/profile-placeholder.png";
import PostContent from "@/components/PostContent";

const ViewThreadPage = () => {
    return (
        <main className="container p-3">
            <ThreadHero />
            <PostContent />
        </main>
    );
};

export default ViewThreadPage;
