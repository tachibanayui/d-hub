import { deleteTag, editTag } from "@/models/tag";
import { editTagDto } from "@/models/tags.client";
import { createPost } from "@/models/thread";
import { authOptions } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        await handlePost(req, res);
    } else if (req.method === "DELETE") {
        await handleDelete(req, res);
    } else {
        res.status(400).json({ message: "Unknown method!" });
    }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;
    if (typeof id !== "string") {
        res.status(400).json({ message: "Please provide thread id route" });
        return;
    }

    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user.id;
    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const content = req.body.content;

    const rs = await createPost({
        content,
        threadId: id,
        userId
    }, false);
    if (rs.success) {
        res.status(200).json({
            ...rs,
        })
    }
    else[
        res.status(500).json({
            ...rs
        })
    ]
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {

}
