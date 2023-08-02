import { ObjectId } from "mongodb";
import client from "./dbconnect";
import { EditProfileDTO, ProfileDB, RegisterDTO, profileDbZod } from "./user.client";
import bcrypt from "bcrypt";

export * from "./user.client";
const userCollection = client.then((x) => x.db("dhub").collection("users"));
const profileCollection = client.then((x) =>
    x.db("dhub").collection<ProfileDB>("profiles")
);

export async function findUserByEmail(email: string) {
    const rs = await (
        await userCollection
    ).findOne({
        email,
    });

    return rs;
}

export async function saveNewUser(registerDto: RegisterDTO) {
    const newUser = await (
        await userCollection
    ).insertOne({
        name: registerDto.name,
        email: registerDto.email,
        password: await bcrypt.hash(registerDto.password, 10),
    });

    return newUser;
}

export async function login(email: string, password: string) {
    const user = await findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
        return user;
    }

    return null;
}

export async function getUserById(userId: string) {
    const _id = new ObjectId(userId);
    const res = await (
        await userCollection
    ).findOne({
        _id,
    });

    if (res) {
        return res;
    }

    return null;
}

export async function getUsersById(ids: string[]) {
    const users = await (
        await userCollection
    )
        .find({
            _id: { $in: ids.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return users;
}

export async function getProfilesById(ids: string[]) {
    const profiles = await (
        await profileCollection
    )
        .find({
            _id: { $in: ids.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return profiles;
}

export async function getOrCreateProfile(userId: string) {
    const user = await getUserById(userId);
    if (!user) {
        return null;
    }

    const pfp = await (
        await profileCollection
    ).findOne({
        _id: new ObjectId(userId),
    });

    if (pfp) {
        return pfp;
    }

    const newPfp = {
        _id: new ObjectId(userId),
        ...profileDbZod.parse({}),
    };

    const res = await (await profileCollection).insertOne(newPfp);
    if (res) {
        return newPfp;
    }

    return null;
}

export async function applyEditProfile(userId: string, data: EditProfileDTO) {
    const editData = data as any;
    if (!data.dob) {
        delete editData.dob;
    } else {
        editData.dob = new Date(data.dob);
    }

    const { username, ...pfp } = data;

    const res = await(await profileCollection).updateOne(
        {
            _id: new ObjectId(userId),
        },
        {
            $set: {
                ...pfp,
                dob: data.dob ? new Date(data.dob) : undefined,
            },
        }
    );

    const resUser = await (await userCollection).updateOne({
        _id: new ObjectId(userId)
    }, {
        $set: {
            name: username
        }
    })

    if (!res.acknowledged || res.matchedCount !== 1) {
        return false;
    }

    return true;
}

export async function applyEditPfpImg(userId: string, url: string) {
    const res = await (
        await userCollection
    ).updateOne(
        {
            _id: new ObjectId(userId),
        },
        {
            $set: {
                image: url,
            },
        }
    );

    if (!res.acknowledged || res.matchedCount !== 1) {
        return false;
    }

    return true;
}

export default userCollection;
