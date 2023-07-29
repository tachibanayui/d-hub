import { applyEditProfile, findUserByEmail, getProfile, saveNewUser } from "@/models/user";
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

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== "string") {
        res.status(400).json({ message: "No profile id provided!" });
        return;
    }
    
    const pfp = editProfileDto.parse(req.body);
    const rs = await applyEditProfile(id, pfp);
    if (rs) {
        res.status(200).json({ message: 'Profile saved successfully' });
        return;
    } else {
        res.status(400).json({ message: "Error edit profile" });
        return;
    }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== "string") {
        res.status(400).json({ message: "No profile id provided!" });
        return;
    }

    const pfp = await getProfile(id);
    if (!pfp) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }

    const pfp2 = pfp as any;
    pfp2.id = pfp._id;
    delete pfp2._id;

    res.status(200).json({
        profile: pfp2,
    });
}
