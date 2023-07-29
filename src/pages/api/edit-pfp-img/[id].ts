import { applyEditPfpImg } from "@/models/user";
import { authOptions } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(400).json({ message: "Please use POST to use this endpoint" });
        return;
    }

    const { url } = req.body;
    const { id } = req.query;
    
    if (typeof id !== "string") {
        res.status(400).json({ message: "No profile id provided!" });
        return;
    }

    const imgUrl = typeof url === "string" ? url : "";
    const rs = await applyEditPfpImg(id, imgUrl);

    if (!rs) {
        res.status(500).json({ message: "internal server error" });
        return;
    }

    res.status(200).json({ message: "Change profile image successfully!" });
}
