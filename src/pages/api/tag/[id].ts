import { deleteTag, editTag } from "@/models/tag";
import { editTagDto } from "@/models/tags.client";
import { NextApiRequest, NextApiResponse } from "next";
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
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "Please provide a tag id to edit!" });
        return;
    }

    const parsed = editTagDto.parse(req.body);
    const rs = await editTag(id, parsed);
    if (!rs) {
        res.status(500).json({ message: "Internal server error!" });
    } else {
        res.status(200).json({ message: "Edit tag successfully" });
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "Please provide a tag id to edit!" });
        return;
    }

    const rs = await deleteTag(id);
    if (!rs) {
        res.status(500).json({ message: "Internal server error!" });
    } else {
        res.status(200).json({ message: "Delete tag successfully" });
    }
}
