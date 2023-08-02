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

const ThreadListItem = ({
    data,
    tagStore,
    authorName,
    hideActions,
}: ThreadListItemProps) => {
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
                    <a href={`/thread/${data.id}`} className="text-light ">
                        {data.title || "Thread title"}
                    </a>
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
                {hideActions || (
                    <div className="d-flex gap-1">
                        <button className="btn btn-outline-light ">
                            <AiOutlineShareAlt /> Share
                        </button>
                        <button className="btn btn-outline-light ">
                            <AiOutlineExclamationCircle /> Report
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-light dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <BsThreeDots />
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Edit
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Delete
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ThreadListItem;

export interface ThreadListItemProps {
    data: Thread;
    tagStore: Tag[];
    authorName: string;
    hideActions?: boolean;
}
