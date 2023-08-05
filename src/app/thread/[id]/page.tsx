import ThreadDetailView from "./ThreadDetailView";
import { getThreadDetailEx, incrementView } from "@/models/thread";
import { notFound } from "next/navigation";
import { getTags } from "@/models/tag";
import { idAsString } from "@/utils/mongoId";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { getProfilesById, roleNumberToString } from "@/models/user";

const ViewThreadPage = async ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;
    
    const tagsPromise = getTags();
    const detailsPromise = getThreadDetailEx(id);
    const profilePromise = userId ? getProfilesById([userId]) : undefined;
    const [tags, details, profile] = await Promise.all([
        tagsPromise,
        detailsPromise,
        profilePromise,
    ]);
    const pfp = profile ? profile.map((x) => idAsString(x)) : undefined;

    const sessionUser = pfp?.length
        ? {
              ...pfp[0],
              name: session?.user.name!,
              role: roleNumberToString(pfp[0].role),
              profileImg: session?.user.image!,
          }
        : undefined;

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
