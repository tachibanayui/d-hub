"use client";
import { Thread } from "@/models/thread.client";
import { useSession } from "@/reexports/nextAuthReact";
import { toast } from "@/reexports/reactToasify";
import { useRouter } from "next/navigation";
import {
    AiFillDelete,
    AiOutlineExclamationCircle,
    AiOutlineShareAlt,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

const ThreadHeroAction = ({ thread }: ThreadHeroActionProps) => {
    const router = useRouter();
    const session = useSession();
    const userId = session.data?.user.id;
    const role = session.data?.user.role ?? 1;

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/thread/${thread.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const json = await res.json();
            if (json.success) {
                toast.success(json.message);
                router.push("/thread");
            } else {
                toast.error(json.message);
            }

        } catch (e) {
            toast.error("Something went wrong, try again later");
        }


    };

    return (
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
                    {/* <li>
                        <a className="dropdown-item" href="#">
                            Edit
                        </a>
                    </li> */}
                    {(role >= 2 || userId === thread.userId) && (
                        <li>
                            <button
                                className="dropdown-item"
                                onClick={handleDelete}
                            >
                                <AiFillDelete /> Delete
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ThreadHeroAction;

export interface ThreadHeroActionProps {
    thread: Thread;
}
