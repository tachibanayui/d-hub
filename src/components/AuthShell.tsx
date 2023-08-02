import Image from "next/image";
import logoFull from "../../public/logo_transparent_full.png";
import {
    AiFillFacebook,
    AiFillGithub,
    AiFillGoogleCircle,
    AiFillTwitterCircle,
} from "react-icons/ai";
import SocialLoginButton from "./SocialLoginButton";
import classNames from "classnames";
import Link from "next/link";
import { signIn } from "@/reexports/nextAuthReact";

const AuthShell = ({ children, isRegister, returnUrl }: AuthShellProps) => {
    return (
        <main className="container my-3 d-flex justify-content-center">
            {/* Pills navs */}
            <div
                className="border p-2 p-md-5 center full-height-grow"
                style={{ maxWidth: 750 }}
            >
                <Image
                    src={logoFull}
                    alt="Logo"
                    className="img-fluid "
                    style={{ height: 400, objectFit: "contain" }}
                />
                <ul
                    className="nav nav-pills nav-justified mb-3"
                    id="ex1"
                    role="tablist"
                >
                    <li className="nav-item" role="presentation">
                        <Link
                            className={classNames("nav-link", {
                                active: !isRegister,
                            })}
                            id="tab-login"
                            data-mdb-toggle="pill"
                            href="/login"
                            role="tab"
                            aria-controls="pills-login"
                            aria-selected={isRegister ? "false" : "true"}
                        >
                            Login
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link
                            className={classNames("nav-link", {
                                active: isRegister,
                            })}
                            id="tab-register"
                            data-mdb-toggle="pill"
                            href="/register"
                            role="tab"
                            aria-controls="pills-register"
                            aria-selected={isRegister ? "false" : "true"}
                        >
                            Register
                        </Link>
                    </li>
                </ul>
                {/* Pills navs */}

                {/* Pills content */}
                <div className="tab-content">
                    <div
                        className="tab-pane fade show active"
                        id="pills-login"
                        role="tabpanel"
                        aria-labelledby="tab-login"
                    >
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <SocialLoginButton>
                                <AiFillFacebook />
                            </SocialLoginButton>

                            <SocialLoginButton
                                signInProvider="google"
                                signInOptions={{
                                    callbackUrl: returnUrl ?? "/",
                                }}
                            >
                                <AiFillGoogleCircle />
                            </SocialLoginButton>

                            <SocialLoginButton>
                                <AiFillTwitterCircle />
                            </SocialLoginButton>

                            <SocialLoginButton>
                                <AiFillGithub />
                            </SocialLoginButton>
                        </div>

                        <p className="text-center">or:</p>
                        {children}
                    </div>
                </div>
                {/* Pills content */}
            </div>
        </main>
    );
};

export default AuthShell;

export interface AuthShellProps {
    children?: React.ReactNode;
    isRegister?: boolean;
    returnUrl?: string;
}
