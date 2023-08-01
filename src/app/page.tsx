"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import TagSelector from "@/components/TagSelector";
import { useSearchParams } from "next/navigation";

export default function Home() {
    return (
        <main>
            <h1>This page is under development, check back later!</h1>
        </main>
    );
}
