"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
export default function Home() {
    const session = useSession();
    return (
        <div>
            <h1>Hello</h1>
            <pre>{JSON.stringify(session)}</pre>
            <button onClick={() => signOut()}>Sign out</button>
            <Link href="/login">Login</Link>
        </div>
    );
}
