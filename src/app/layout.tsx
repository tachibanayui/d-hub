import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "@/reexports/nextAuthReact";
import { ToastContainer } from "@/reexports/reactToasify";
import Header from "./Header";
import BootstrapImport from "./BootstrapImport";
import Footer from "./Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "DHub",
    description: "Discussion forum for the future",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://dhub.sharpi.co",
        description: "Discussion forum for the future",
        title: "DHub",
        siteName: "DHub",
        images: [
            {
                url: "/profile_image.png",
                alt: "DHub",
            },
        ],
    },
    icons: {
        icon: "/logo_transparent.png",
        shortcut: "/logo_transparent.png",
        apple: "/logo_transparent.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" bs-theme-light="true">
            <body className={inter.className}>
                <SessionProvider>
                    <div className="fill d-flex flex-column">
                        <div className="full-height-fixed sticky-top">
                            <Header />
                        </div>
                        <main className="full-height-grow">
                            {children}
                        </main>
                        <div className="full-height-fixed">
                            <Footer />
                        </div>
                    </div>
                </SessionProvider>
                <ToastContainer />
                <BootstrapImport />
            </body>
        </html>
    );
}
