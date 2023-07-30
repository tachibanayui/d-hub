import { omit, retain } from "@/utils/zodObject";
import { z } from "zod";

export const tagZod = z.object({
    id: z.string(),
    topic: z.string().nonempty(),
    description: z.string().optional(),
    created: z.date().default(new Date()),
});
export type Tag = z.infer<typeof tagZod>;

export const tagDbZod = omit(tagZod, ["id"]);
export type TagDB = z.infer<typeof tagDbZod>;

export const editTagDto = omit(tagZod, ["id", "created"]);
export type EditTagDTO = z.infer<typeof editTagDto>;
