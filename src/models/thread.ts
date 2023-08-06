import { Document, ObjectId } from "mongodb";
import client from "./dbconnect";
import { findTagsById, tagCollection } from "./tag";
import {
    CreatePostDTO,
    CreateThreadDTO,
    PostDB,
    ThreadDB,
    createThreadDto,
    postDbZod,
    threadDbZod,
} from "./thread.client";
import userCollection, {
    getOrCreateProfile,
    getProfilesById,
    getUserById,
    getUsersById,
} from "./user";
import { idAsString } from "@/utils/mongoId";

export * from "./thread.client";

export const threadCollection = client.then((x) =>
    x.db("dhub").collection<ThreadDB>("threads")
);
export const postCollection = client.then((x) =>
    x.db("dhub").collection<PostDB>("posts")
);

export async function findThreadsById(ids: string[]) {
    const threads = await (
        await threadCollection
    )
        .find({
            _id: { $in: ids.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return threads;
}

export async function createPost(
    data: CreatePostDTO,
    noThreadRefCheck: boolean
) {
    if (!noThreadRefCheck && !(await findThreadsById([data.threadId]))) {
        return {
            success: false,
            message: "thread not found!",
        };
    }

    const parsed = postDbZod.parse(data);
    const rs = await (await postCollection).insertOne(parsed);
    if (!rs.acknowledged) {
        return {
            success: false,
            message: "Something wrong when creating post!",
        };
    }

    return {
        success: true,
        message: "Create post successful!",
        id: rs.insertedId.toString(),
    };
}

export async function createThread(data: CreateThreadDTO, userId: string) {
    const parsed = createThreadDto.parse(data);
    const tags = await findTagsById(parsed.tagIds);
    if (tags.length !== parsed.tagIds.length) {
        return { success: false, message: "data contains invalid tag ids!" };
    }

    const { content, ...rest } = parsed;
    const thread = threadDbZod.parse({ ...rest, userId: userId });

    const rs = await (await threadCollection).insertOne(thread);
    if (!rs.acknowledged) {
        return {
            success: false,
            message: "Something wrong when creating thread!",
        };
    }

    const rsPost = await createPost(
        {
            threadId: rs.insertedId.toString(),
            userId: thread.userId,
            content: content,
        },
        true
    );

    if (!rsPost.success) {
        return rsPost;
    }

    return {
        success: true,
        message: "Thread created successfully!",
        threadId: rs.insertedId.toString(),
        postId: rsPost.id!,
    };
}

export async function findPostsById(ids: string[]) {
    const posts = await (
        await postCollection
    )
        .find({
            _id: { $in: ids.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return posts;
}

export async function findPostsInThread(threadId: string) {
    const posts = await (
        await postCollection
    )
        .find({
            threadId: threadId,
        })
        .sort({
            created: 1,
        })
        .toArray();

    return posts;
}

export async function getCombinedsById(ids: string[]) {}

export async function getThreadDetailEx(threadId: string) {
    const threads = await findThreadsById([threadId]);

    if (threads.length !== 1) {
        return {
            success: false,
            message: `Cannot find thread with id: ${threadId}`,
        };
    }

    const posts = await findPostsInThread(threadId);
    const participatingUsers = Array.from(
        new Set(posts.map((x) => x.userId)).values()
    );
    const usersData = await getUsersById(participatingUsers);
    const profiles = await getProfilesById(participatingUsers);

    return {
        success: true,
        message: "Detail received!",
        threadData: idAsString(threads[0]),
        posts: posts.map((x) => idAsString(x)),
        users: usersData.map((x) => idAsString(x)),
        profles: profiles.map((x) => idAsString(x)),
    };
}

export async function incrementView(threadId: string) {
    (await threadCollection).updateOne(
        { _id: new ObjectId(threadId) },
        {
            $inc: {
                view: 1,
            },
        }
    );
}

export async function likePost(
    postId: string,
    userId: string,
    activate: boolean
) {
    const updateLike = {
        $addToSet: {
            likes: userId,
        },
    };

    const updateUnlike = {
        $pull: {
            likes: userId,
        },
    };

    const update = activate ? updateLike : updateUnlike;
    const res = await (
        await postCollection
    ).updateOne({ _id: new ObjectId(postId) }, update);
    if (res.modifiedCount !== 1) {
        return {
            success: false,
            message: "Something wrong when updating likes",
        };
    }

    const rs = await findPostsById([postId]);
    if (rs.length === 0) {
        return {
            success: false,
            message: `Cannot find id: ${postId}!`,
        };
    }

    return { success: true, message: `Updated`, likes: rs[0].likes };
}

export async function dislikePost(
    postId: string,
    userId: string,
    activate: boolean
) {
    const updateLike = {
        $addToSet: {
            dislikes: userId,
        },
    };

    const updateUnlike = {
        $pull: {
            dislikes: userId,
        },
    };

    const update = activate ? updateLike : updateUnlike;
    const res = await (
        await postCollection
    ).updateOne({ _id: new ObjectId(postId) }, update);
    if (res.modifiedCount !== 1) {
        return {
            success: false,
            message: "Something wrong when updating likes",
        };
    }

    const rs = await findPostsById([postId]);
    if (rs.length === 0) {
        return {
            success: false,
            message: `Cannot find id: ${postId}!`,
        };
    }

    return { success: true, message: `Updated`, dislikes: rs[0].dislikes };
}

export interface SearchThreadOptions {
    title?: string;
    author?: string;
    tags?: string[];
    before?: number;
    after?: number;

    pageIndex: number;
    pageSize: number;
}

export async function searchThreads(opt: SearchThreadOptions) {
    const { title, author, tags, before, after, pageIndex, pageSize } = opt;

    const query = {
        title: { $regex: title || "", $options: "i" },
    } as Document;

    if (author) {
        const userIds = await (
            await (
                await userCollection
            )
                .find({
                    name: { $regex: author, $options: "i" },
                })
                .project({ _id: 1 })
                .toArray()
        ).map((x) => x._id.toString());

        query.userId = { $in: userIds };
    }

    if (tags?.length) {
        query.tagIds = { $elemMatch: { $in: tags || [] } };
    }

    if (after) {
        query.created = { $gt: new Date(after) };
    }

    if (before) {
        query.created = { ...query.created, $lt: new Date(before) };
    }

    const rs = await (
        await threadCollection
    )
        .find(query, {
            skip: Math.max(0, pageIndex - 1) * pageSize,
            limit: pageSize,
            sort: {
                created: -1,
            },
        })
        .toArray();

    const rsCount = await (await threadCollection).countDocuments(query);

    return {
        success: true,
        count: rsCount,
        data: rs.map((x) => idAsString(x)),
    };
}

export async function getHotThreads() {
    return await searchThreads({
        pageIndex: 1,
        pageSize: 5,
    });
}

export async function deletePost(postId: string) {
    const res = await (
        await postCollection
    ).deleteOne({ _id: new ObjectId(postId) });
    if (res.deletedCount === 1) {
        return { success: true, message: "deleted successfully!" };
    } else {
        return { success: false, message: "failed to delete!" };
    }
}
