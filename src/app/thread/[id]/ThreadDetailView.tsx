import NewPostEditor from "@/components/NewPostEditor";
import PostCard, { PostCardProps } from "@/components/PostCard";
import ThreadHero from "@/components/ThreadHero";
import { Tag } from "@/models/tags.client";
import { Post, Thread } from "@/models/thread.client";
import { Profile, ProfileDB, roleNumberToString } from "@/models/user.client";
import { Session } from "next-auth";
import Link from "next/link";
import { useMemo } from "react";
import { BsBack } from "react-icons/bs";

const ThreadDetailView = ({
    threadData,
    profiles,
    users,
    tagStore,
    posts,
    sessionUser
}: ThreadDetailViewProps) => {
    const profileMap = useMemo(
        () => new Map(profiles.map((x) => [x.id, x])),
        [profiles]
    );
    const userMap = useMemo(
        () => new Map(users.map((x) => [x.id, x])),
        [users]
    );
    const username = userMap.get(threadData.userId)?.name ?? "Unknown";

    return (
        <main className="container">
            <Link href="/thread" className="btn btn-outline-primary mb-2">
                <BsBack /> Back to thread list
            </Link>
            <ThreadHero
                data={threadData}
                authorName={username}
                tagStore={tagStore}
            />

            <hr />

            {posts.map((x) => (
                <div key={x.id} className="my-2">
                    <PostCard
                        showActions={true}
                        post={x}
                        user={{
                            ...userMap.get(x.userId)!,
                            ...profileMap.get(x.userId)!,
                            profileImg: userMap.get(x.userId)?.image,
                            role: roleNumberToString(
                                profileMap.get(x.userId)?.role ?? 1
                            ),
                        }}
                    />
                </div>
            ))}

            <hr />
            <h2>Add a new post: </h2>
            {sessionUser ? (
                <NewPostEditor threadId={threadData.id} user={sessionUser} />
            ) : (
                <p className="text-danger">Login to post in this thread!</p>
            )}
        </main>
    );
};

export default ThreadDetailView;

export interface ThreadDetailViewProps {
    threadData: Thread;
    posts: Post[];
    profiles: Profile[];
    tagStore: Tag[];
    users: {
        id: string;
        name: string;
        image: string;
    }[];
    sessionUser?: PostCardProps["user"];
}
