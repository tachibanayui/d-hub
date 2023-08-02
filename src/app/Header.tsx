"use client";
import Image from "next/image";
import logo from "../../public/logo_transparent.png";
import useBsScript from "@/hooks/useBsScript";
import UserNavbarParts from "./UserNavbarPart";
import Link from "next/link";

const Header = () => {
    return (
        <header >
            <nav
                className="navbar bg-primary navbar-expand-lg"
                data-bs-theme="dark"
            >
                <div className="container-fluid">
                    <a
                        className="navbar-brand d-flex align-items-center"
                        href="/"
                    >
                        <Image
                            src={logo}
                            alt="Logo"
                            width="64"
                            height="64"
                            className="d-inline-block align-text-top"
                            style={{ objectFit: "contain" }}
                        />
                        DHub
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <Link
                                className="nav-link"
                                aria-current="page"
                                href="/"
                            >
                                Home
                            </Link>
                            <Link className="nav-link" href="/thread">
                                Threads
                            </Link>
                            <Link className="nav-link" href="/tag">
                                Tags
                            </Link>
                            <Link className="nav-link" href="#">
                                About Us
                            </Link>
                        </div>

                        <hr className="border-white border-2" />

                        <div className="ms-auto d-flex text-white">
                            <UserNavbarParts />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
