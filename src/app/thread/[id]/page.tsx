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
import PostCard from "@/components/PostCard";
import ThreadDetailView from "./ThreadDetailView";
import { getThreadDetailEx, incrementView } from "@/models/thread";
import { notFound } from "next/navigation";
import { getTags } from "@/models/tag";
import { idAsString } from "@/utils/mongoId";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getProfilesById, roleNumberToString } from "@/models/user";

const ViewThreadPage = async ({ params }: { params: { id: string } }) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    const pfp = userId
        ? (await getProfilesById([userId])).map(x => idAsString(x))
        : undefined;
    
    const sessionUser = pfp?.length ? {
        ...pfp[0],
        name: session?.user.name!,
        role: roleNumberToString(pfp[0].role)
    } : undefined;

    const id = params.id;
    const tags = await getTags();
    const details = await getThreadDetailEx(id);

    if (!details.success) {
        return notFound();
    }

    const { profles, users, threadData, posts } = details;

    await incrementView(id);
    threadData!.view++;


    return (
        <main className="container p-3">
            <ThreadDetailView
                threadData={threadData!}
                posts={posts!}
                profiles={profles!}
                users={(users as any)!}
                tagStore={tags}
                sessionUser={sessionUser}
            />
        </main>
    );
};

export default ViewThreadPage;
