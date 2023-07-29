import { findUserByEmail, saveNewUser } from "@/models/user";
import { registerDto } from "@/models/user.client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const parsed = registerDto.parse(req.body);
    const exists = await findUserByEmail(parsed.email);
    if (exists) {
        res.status(400).json({ message: "This email is already registered!" });
        return;
    }

    const newUser = await saveNewUser(parsed);
    if (!newUser.acknowledged) {
        res.status(500).json({ message: "Unknown error" });
    }

    res.status(200).json({
        user: {
            id: newUser.insertedId.toString(),
            name: parsed.name,
            email: parsed.email,
        },
    });
}
