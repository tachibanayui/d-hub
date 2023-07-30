import AuthShell from "@/components/AuthShell";
import LoginForm from "./LoginForm";
import { Suspense } from "react";

const LoginPage = ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { returnUrl } = searchParams;
    const url = returnUrl ? typeof returnUrl === "string" ? returnUrl : returnUrl[0] : "/";


    return (
        <AuthShell>
            <Suspense fallback={<span>gg</span>}>
                <LoginForm returnUrl={url} />
            </Suspense>
        </AuthShell>
    );
};

export default LoginPage;
