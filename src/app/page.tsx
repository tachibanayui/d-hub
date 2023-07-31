import Image from "next/image";
import styles from "./page.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import TagSelector from "@/components/TagSelector";

export default function Home() {
    return (
        <main>
            <h1>Test</h1>
        </main>
    );
}
