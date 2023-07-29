import { ReactNode } from "react";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <div className="container-xl px-4 mt-4">
                <nav className="nav nav-borders">
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
                {children}
            </div>
        </main>
    );
};

export default Layout;
