import { Thread } from "@/models/thread.client";
import { formatRelative } from "date-fns";
import {
    AiFillCalendar,
    AiFillEye,
    AiOutlineExclamationCircle,
    AiOutlineShareAlt,
} from "react-icons/ai";
import { BsDot, BsFillPersonFill, BsThreeDots } from "react-icons/bs";
import TagPill from "./TagPill";
import { Tag } from "@/models/tags.client";
import ThreadHeroAction from "./ThreadHeroAction";

const ThreadHero = ({ data, tagStore, authorName }: ThreadHeroProps) => {
    return (
        <section
            className="border rounded"
            style={{
                backgroundImage: `url('${data.backgroundImg || ""}')`,
                backgroundColor: "black",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="p-3 text-white"
                style={{
                    background: "#00000042",
                }}
            >
                <h1 style={{ fontSize: "2rem" }}>
                    {data.title || "Thread title"}
                </h1>
                <p className="d-flex gap-2">
                    {data.tagIds
                        .map((x) => tagStore.find((f) => f.id === x))
                        .filter((x) => x !== undefined)
                        .map((x) => (
                            <TagPill key={x!.id} data={x!} />
                        ))}
                </p>
                <div>
                    <p>
                        <BsFillPersonFill /> {authorName} <BsDot />{" "}
                        <AiFillCalendar />{" "}
                        {formatRelative(data.created, new Date())}
                    </p>

                    <p>
                        <AiFillEye /> {data.view} views
                    </p>
                </div>
                <ThreadHeroAction thread={data}/>
            </div>
        </section>
    );
};

export default ThreadHero;

export interface ThreadHeroProps {
    data: Thread;
    tagStore: Tag[];
    authorName: string;
}
