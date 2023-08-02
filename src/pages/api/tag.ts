import { createTag, editTagDto, getTags } from "@/models/tag";
import {
    applyEditProfile,
    findUserByEmail,
    getOrCreateProfile,
    saveNewUser,
} from "@/models/user";
import { editProfileDto, registerDto } from "@/models/user.client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "GET") {
        await handleGet(req, res);
    } else {
        await handlePost(req, res);
    }
}


async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const tags = await getTags();
    res.status(200).json({
        count: tags.length,
        data: tags,
    });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const parsed = editTagDto.parse(req.body);
    const newTag = await createTag(parsed);
    if (newTag) {
        res.status(201).json({ message: "Created successfully!", id: newTag.toString() });
    } else {
        res.status(500).json({ message: "Internal Server Error!" });
    }

    // createTag()
}

