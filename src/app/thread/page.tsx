import SearchThreadDialog from "@/app/thread/SearchThreadDialog";
import ThreadListItem from "@/components/ThreadListItem";
import { getTags } from "@/models/tag";
import { searchThreads } from "@/models/thread";
import ThreadPageNav from "./ThreadPageNav";
import HotThreadCarosel from "./HotThreadCarosel";

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
    
    const threads = await searchThreads({
        ...(searchParams as any),
        tags: selTags,
        before: beforeNum,
        after: afterNum,
        pageIndex: 0,
        pageSize: 10,
    });

    return (
        <main className="container-fluid p-1 p-lg-3 p-xl-5">
            <h1>
                Welcome to DHub. Let&apos;s catch up with the hotest topic
                today!
            </h1>
            <HotThreadCarosel hotThreads={threads.data} tagStore={tags} />

            <hr />

            <h1>Browse Threads</h1>
            <div className="row">
                <div className="col-12 col-lg-4">
                    <SearchThreadDialog
                        tagStore={tags}
                        initialFormData={{
                            ...searchParams,
                            tagIds: selTags,
                            after: afterNum ? new Date(afterNum).toISOString().split('T')[0] : undefined,
                            before: beforeNum ? new Date(beforeNum).toISOString().split('T')[0] : undefined,
                        }}
                    />
                </div>
                <div className="col-12 col-lg-8">
                    <ThreadPageNav />
                    {threads.data.map((x) => (
                        <div key={x.id} className="p-1">
                            <ThreadListItem
                                authorName="TODO"
                                tagStore={tags}
                                data={x}
                            />
                        </div>
                    ))}
                    <ThreadPageNav />
                </div>
            </div>
        </main>
    );
};

export default ThreadListPage;
