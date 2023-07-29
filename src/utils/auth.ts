import client from "@/models/dbconnect";
import { login } from "@/models/user";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(client, {
        databaseName: "dhub",
    }) as any,
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            clientId: process.env.OAUTH_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.OAUTH_GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }

                const user = await login(
                    credentials.email,
                    credentials.password
                );
                if (!user) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    image: user.image,
                    name: user.name,
                };
            },
        }),
    ],
    callbacks: {
        jwt: (params) => {
            const { token, account, profile, user } = params;
            if (account) {
                token.userId = user.id;
                return token;
            }

            return token;
        },  
        session: (params) => {
            const { session, token } = params;
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.userId,
                },
            };
        },
    },
};