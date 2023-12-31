import { dislikePost, findPostsById, likePost } from "@/models/thread";
import { applyEditProfile, getOrCreateProfile } from "@/models/user";
import { editProfileDto, registerDto } from "@/models/user.client";
import { authOptions } from "@/utils/auth";
import { idAsString } from "@/utils/mongoId";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "DELETE") {
        await handleDelete(req, res);
    } else if (req.method === "POST") {
        await handlePost(req, res);
    } else {
        await handleGet(req, res);
    }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "No post id provided!" });
        return;
    }

    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const rs = await likePost(id, userId, false);
    if (!rs.success) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    res.status(200).json({
        likes: rs.likes,
    });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "No profile id provided!" });
        return;
    }

    const session = await getServerSession(req, res, authOptions);
    const userId = session?.user.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const rs = await likePost(id, userId, true);
    if (!rs.success) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    res.status(200).json({
        likes: rs.likes,
    });
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "No profile id provided!" });
        return;
    }

    const rs = await findPostsById([id]);
    if (rs.length !== 1) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    res.status(200).json({ likes: rs[0].likes });
}
