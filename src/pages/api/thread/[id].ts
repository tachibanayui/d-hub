import {
    deletePost,
    deleteThread,
    dislikePost,
    findPostsById,
    findThreadsById,
    likePost,
} from "@/models/thread";
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
        res.status(400).json({
            success: false,
            message: "No thread id provided!",
        });
        return;
    }

    if (req.method !== "DELETE") {
        return res
            .status(400)
            .json({ success: false, message: "Unknown http method" });
    }

    // check for permission
    const [session, thread] = await Promise.all([
        getServerSession(req, res, authOptions),
        findThreadsById([id]),
    ]);
    if (thread.length === 0) {
        return res
            .status(400)
            .json({ success: false, message: `Thread ${id} doesn't exist!` });
    }

    const author = thread[0].userId;
    const userId = session?.user.id;
    const role = session?.user.role ?? 1;
    if (role < 2 && userId !== author) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const rs = await deleteThread(id);
    if (rs.success) {
        res.status(200).json(rs);
    } else {
        res.status(500).json(rs);
    }
}
