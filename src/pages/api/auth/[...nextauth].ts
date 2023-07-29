import { authOptions } from '@/utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    await NextAuth(req, res, authOptions);
}
