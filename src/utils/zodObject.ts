import { ZodObject, ZodRawShape, z } from "zod";

export function retain<
    Def extends ZodRawShape,
    Z extends ZodObject<Def>,
    T extends keyof Z["shape"]
>(zodObject: Z, items: T[]): ZodObject<Pick<Z["shape"], T>> {
    const rs = {} as Pick<Z["shape"], T>;

    Object.keys(zodObject.shape)
        .filter((x) => items.includes(x as T))
        .forEach((x) => {
            (rs as any)[x] = zodObject.shape[x];
        });

    return z.object(rs);
}

export function omit<
    Def extends ZodRawShape,
    Z extends ZodObject<Def>,
    T extends keyof Z["shape"]
>(zodObject: Z, items: T[]): ZodObject<Omit<Z["shape"], T>> {
    const rs = {} as Omit<Z["shape"], T>;

    Object.keys(zodObject.shape)
        .filter((x) => !items.includes(x as T))
        .forEach((x) => {
            (rs as any)[x] = zodObject.shape[x];
        });

    return z.object(rs);
}
