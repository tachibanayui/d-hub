"use client";
import { signOut, useSession } from "@/reexports/nextAuthReact";
import Link from "next/link";

const UserNavbarParts = () => {
    const session = useSession();
    if (session.status === "loading") {
        return (
            <span className="opacity-75">
                Loading... 
            </span>
        );
    }
    if (session.status === "unauthenticated") {
        return (
            <div className="navbar-nav d-flex align-items-lg-center">
                <Link className="nav-link" href="/login">
                    Sign in
                </Link>
                <span className="d-none d-lg-block">|</span>
                <Link className="nav-link" href="/register">
                    Sign up
                </Link>
            </div>
        );
    }

    return (
        <div className="navbar-nav ">
            <li className="nav-item dropdown ">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    Hi,{" "}
                    <span className="text-white">
                        {session.data?.user?.name ?? "Beloved User"}
                    </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                        <Link className="dropdown-item" href={`/profile/${session.data?.user.id}`}>
                            My Profile
                        </Link>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            My Report
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={() => signOut()}
                        >
                            Sign out
                        </button>
                    </li>
                </ul>
            </li>
        </div>
    );


};

export default UserNavbarParts;
