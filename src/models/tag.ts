import { ObjectId } from "mongodb";
import client from "./dbconnect";
import {
    EditTagDTO,
    Tag,
    TagDB,
    editTagDto,
    tagDbZod,
    tagZod,
} from "./tags.client";

export * from "./tags.client";

export const tagCollection = client.then((x) =>
    x.db("dhub").collection<TagDB>("tags")
);

export async function getTags(): Promise<Tag[]> {
    const tagsDocs = (await (await tagCollection).find().toArray())
        .map(
            (x) =>
                ({
                    ...x,
                    id: x._id.toString(),
                } as Tag)
        )
        .map((x) => tagZod.parse(x));

    return tagsDocs;
}

export async function createTag(tag: EditTagDTO) {
    const parsed = editTagDto.parse(tag);
    const tagsDocs = await (
        await tagCollection
    ).insertOne({
        ...tagDbZod.parse(parsed),
    });

    if (tagsDocs) {
        return tagsDocs.insertedId;
    }

    return null;
}

export async function editTag(tagId: string, data: EditTagDTO) {
    const parsed = editTagDto.parse(data);
    let rs = await (
        await tagCollection
    ).updateOne(
        { _id: new ObjectId(tagId) },
        {
            $set: {
                ...parsed,
            },
        }
    );

    return rs.acknowledged && rs.matchedCount === 1;
}

export async function deleteTag(tagId: string) {
    let rs = await (
        await tagCollection
    ).deleteOne({ _id: new ObjectId(tagId) });

    return rs.acknowledged && rs.deletedCount === 1;
}

export async function findTagsById(tagIds: string[]) {
    const tags = await (
        await tagCollection
    )
        .find({
            _id: { $in: tagIds.map((x) => new ObjectId(x)) },
        })
        .toArray();

    return tags;
}
