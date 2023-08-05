import SearchThreadDialog from "@/app/thread/SearchThreadDialog";
import ThreadListItem from "@/components/ThreadListItem";
import { getTags } from "@/models/tag";
import { getHotThreads, searchThreads } from "@/models/thread";
import ThreadPageNav from "./ThreadPageNav";
import HotThreadCarosel from "./HotThreadCarosel";
import Image from "next/image";
import noResultImg from "../../../public/no_result.png";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { getUsersById } from "@/models/user";
import { idAsString } from "@/utils/mongoId";
import { Suspense } from "react";

const pageSize = 10;

const ThreadListPage = async ({
    searchParams,
}: {
    searchParams: { [s: string]: string };
}) => {
    const tags = await getTags();
    const selTags =
        searchParams.tagIds?.length > 0 ? searchParams.tagIds.split(",") : [];
    const beforeNum = searchParams.before
        ? parseInt(searchParams.before)
        : undefined;
    const afterNum = searchParams.after
        ? parseInt(searchParams.after)
        : undefined;

    const pageIndex = searchParams.page ? parseInt(searchParams.page) : 1;

    const threads = await searchThreads({
        ...(searchParams as any),
        tags: selTags,
        before: beforeNum,
        after: afterNum,
        pageIndex,
        pageSize,
    });

    const user = (
        await getUsersById(
            Array.from(new Set([...threads.data.map((x) => x.userId)]))
        )
    ).map((x) => idAsString(x));

    const userMap = new Map(user.map((x) => [x.id, x]));

    return (
        <main className="container-fluid p-1 p-lg-3 p-xl-5">
            <h1>
                Welcome to DHub. Let&apos;s catch up with the hotest topic
                today!
            </h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                <HotThreadCarosel tagStore={tags} />
            </Suspense>

            <hr />

            <h1>Browse Threads</h1>
            <div className="row">
                <div className="col-12 col-lg-4">
                    <SearchThreadDialog
                        tagStore={tags}
                        initialFormData={{
                            ...searchParams,
                            tagIds: selTags,
                            after: afterNum
                                ? new Date(afterNum).toISOString().split("T")[0]
                                : undefined,
                            before: beforeNum
                                ? new Date(beforeNum)
                                      .toISOString()
                                      .split("T")[0]
                                : undefined,
                        }}
                    />
                </div>
                <div className="col-12 col-lg-8">
                    <ThreadPageNav
                        currentPage={pageIndex}
                        pageCount={Math.ceil(threads.count / pageSize)}
                        urlParams={searchParams}
                    />
                    {threads.data.map((x) => (
                        <div key={x.id} className="p-1">
                            <ThreadListItem
                                authorName={userMap.get(x.userId)?.name}
                                tagStore={tags}
                                data={x}
                            />
                        </div>
                    ))}
                    {threads.data.length === 0 && (
                        <div className="d-flex flex-column align-items-center">
                            <Image src={noResultImg} alt="No result" />
                            <h2>No result found!</h2>
                            <Link
                                href="/thread/new"
                                className="btn btn-primary"
                            >
                                <AiOutlinePlus />
                                Create a new thread
                            </Link>
                        </div>
                    )}
                    <ThreadPageNav
                        currentPage={pageIndex}
                        pageCount={Math.ceil(threads.count / pageSize)}
                        urlParams={searchParams}
                    />
                </div>
            </div>
        </main>
    );
};

export default ThreadListPage;
