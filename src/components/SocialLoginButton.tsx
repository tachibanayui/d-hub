"use client";
import { signIn } from "@/reexports/nextAuthReact";
import { MouseEventHandler } from "react";

const SocialLoginButton = ({
    children,
    signInProvider,
    signInOptions,
}: SocialLoginButtonProps) => {
    return (
        <button
            type="button"
            className="btn btn-light rounded-circle mx-1"
            onClick={() => signIn(signInProvider, signInOptions)}
        >
            {children}
        </button>
    );
};
 
export default SocialLoginButton;

interface SocialLoginButtonProps {
    children?: React.ReactNode;
    signInProvider?: Parameters<typeof signIn>[0];
    signInOptions?: Parameters<typeof signIn>[1];
}