import { ReactNode } from "react";
import Link from "next/link";
import { ToastContainer } from "@/reexports/reactToasify";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="fill">
            <div className="container-xl px-4 mt-4 fill d-flex flex-column">
                <nav className="nav nav-borders" style={{ flex: "0 1 auto" }}>
                    <Link className="nav-link active ms-0" href="/profile">
                        Profile
                    </Link>
                    <Link className="nav-link" href="/profile">
                        Security
                    </Link>
                    <Link className="nav-link" href="/profile">
                        Role
                    </Link>
                    <Link className="nav-link" href="/profile">
                        Ban
                    </Link>
                </nav>
                <hr className="mt-0 mb-4" />
                <div style={{ flex: "1 0 auto" }}>{children}</div>
            </div>
            <ToastContainer />
        </main>
    );
};

export default Layout;
