import { ObjectId } from "mongodb";
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

export * from "./thread.client";

export const threadCollection = client.then((x) =>
    x.db("dhub").collection<ThreadDB>("threads")
);
export const postCollection = client.then((x) =>
    x.db("dhub").collection<PostDB>("posts")
);

export async function findThreadsById(ids: string[]) {
    const tags = await (
        await threadCollection
    )
        .find({
            _id: { $in: ids.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return tags;
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
        id: rs.insertedId.toString()
    }
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
        postId: rsPost.id!
    }
}