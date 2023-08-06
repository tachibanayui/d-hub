import { deletePost, dislikePost, findPostsById, likePost } from "@/models/thread";
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
    const { id } = req.query;
    if (typeof id !== "string") {
        res.status(400).json({ message: "No post id provided!" });
        return;
    }

    if (req.method !== "DELETE") {
        return res.status(400).json({ message: "Unknown http method" });
    } 

    const rs = await deletePost(id);
    if (rs.success) {
        res.status(200).json(rs);
    } else {
        res.status(500).json(rs);
    }
}
