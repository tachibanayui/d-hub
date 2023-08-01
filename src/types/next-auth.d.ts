import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: 1 | 2 | 3
        } & DefaultSession["user"];
    }
}
