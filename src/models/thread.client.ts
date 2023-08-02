import { omit, retain } from "@/utils/zodObject";
import { z } from "zod";

export const postZod = z.object({
    id: z.string(),
    userId: z.string(),
    threadId: z.string(),
    content: z.string().min(1).max(10000),
    likes: z.array(z.string()).default([]),
    dislikes: z.array(z.string()).default([]),
    created: z.date().default(new Date()),
});
export type Post = z.infer<typeof postZod>;

export const postDbZod = omit(postZod, ["id"]);
export type PostDB = z.infer<typeof postDbZod>;

export const createPostDto = retain(postZod, ["threadId", "userId", "content"]);
export type CreatePostDTO = z.infer<typeof createPostDto>;

export const threadZod = z.object({
    id: z.string(),
    title: z.string().min(2).max(256),
    backgroundImg: z.union([
        z.literal("").transform((x) => undefined),
        z.string().url().optional(),
    ]),
    userId: z.string(),
    tagIds: z.array(z.string()),
    view: z.number().default(0),
    created: z.date().default(new Date()),
});
export type Thread = z.infer<typeof threadZod>;

export const threadDbZod = omit(threadZod, ["id"]);
export type ThreadDB = z.infer<typeof threadDbZod>;

export const createThreadDto = retain(threadZod, [
    "title",
    "backgroundImg",
    "tagIds",
]).extend(retain(postZod, ["content"]).shape);
export type CreateThreadDTO = z.infer<typeof createThreadDto>;

export const searchThreadDto = retain(threadZod, ["tagIds"]).extend({
    title: z.string().optional(),
    after: z.string().optional(),
    before: z.string().optional(),
    author: z.string().optional(),
});
export type SearchThreadDTO = z.infer<typeof searchThreadDto>;
