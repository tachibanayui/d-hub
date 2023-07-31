import { createTag, editTagDto, getTags } from "@/models/tag";
import { createThread } from "@/models/thread";
import { createThreadDto } from "@/models/thread.client";
import {
    applyEditProfile,
    findUserByEmail,
    getProfile,
    saveNewUser,
} from "@/models/user";
import { editProfileDto, registerDto } from "@/models/user.client";
import { authOptions } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

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
    res.status(200).json({});
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);
    const id = session?.user.id;
    if (!id) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }

    const rs = await createThread(req.body, id);
    if (rs.success) {
        res.status(201).json(rs);
    } else {
        res.status(400).json(rs);
    }
}
