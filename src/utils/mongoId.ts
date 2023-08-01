import { ObjectId, WithId } from "mongodb";
type TypeWithId<T> = Omit<{ id: string } & T, "_id">;

export function idAsString<T>(data: WithId<T>): TypeWithId<T> {
    (data as any).id = data._id.toString();
    delete (data as any)._id;
    return data as unknown as TypeWithId<T>;
}

export function idAsObjId<T>(data: TypeWithId<T>): WithId<Omit<T, "id">> {
    (data as any)._id = new ObjectId(data.id);
    delete (data as any).id;
    return data as any;
}
