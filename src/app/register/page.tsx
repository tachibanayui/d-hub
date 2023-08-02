import AuthShell from "@/components/AuthShell";
import RegisterForm from "./RegisterForm";

const RegisterPage = () => {
    return (
        <AuthShell isRegister>
            <RegisterForm/>
        </AuthShell>
    );
};

export default RegisterPage;
