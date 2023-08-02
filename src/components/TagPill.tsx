import { Tag } from "@/models/tags.client";
import Link from "next/link";
import { AiFillTag } from "react-icons/ai";

const TagPill = ({ data }: TagPillProps) => {
    return (
        <span className="badge rounded-pill bg-primary">
            <Link href="#" className="text-white" role="button">
                <AiFillTag /> {data.topic}
            </Link>
        </span>
    );
};

export default TagPill;

export interface TagPillProps {
    data: Tag;
}
