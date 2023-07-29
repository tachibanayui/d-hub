import z from "zod";

export const usernameZod = z
    .string()
    .min(2, { message: "Name too short" })
    .max(256, { message: "Name too long" });

export const registerDto = z
    .object({
        name: usernameZod,
        email: z.string().email(),
        password: z.string().min(8).max(64),
        confirmPassword: z.string().min(8).max(64),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        () => ({ message: "Passwords do not match" })
    );
export type RegisterDTO = z.infer<typeof registerDto>;

export const loginDto = z.object({
    email: registerDto.innerType().shape.email,
    password: registerDto.innerType().shape.password,
});
export type LoginDTO = z.infer<typeof loginDto>;

export const profileZod = z.object({
    motto: z.string().optional(),
    location: z.string().max(256, "Location too long!").optional(),
    phone: z.string().max(64, "Phone number too long!").optional(),
    dob: z.date().optional(),
    profileImg: z.string().optional(),
    role: z.union([z.literal(1), z.literal(2), z.literal(3)]).default(1),
});

export type Profile = z.infer<typeof profileZod>

export const editProfileDto = z.object({
    username: usernameZod,
    motto: profileZod.shape.motto,
    location: profileZod.shape.location,
    phone: profileZod.shape.phone,
    dob: z.string().optional(),
});

export type EditProfileDTO = z.infer<typeof editProfileDto>