"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginDTO, loginDto } from "@/models/user.client";
import { getUnknownError } from "@/utils/reactHookForm";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<LoginDTO>({
        resolver: zodResolver(loginDto),
    });

    const onSubmit = async (data: LoginDTO) => {
        try {
            const rs = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: '/login'
            });
            if (!rs?.ok) {
                alert(rs?.error);
                return;
            }

            push("/");
        } catch (e) {
            alert("Error: " + e);
        }
    };

    return (
        <main className="container">
            <div className="card">
                <div className="card-header">
                    <h1>Login</h1>
                </div>
                <div className="card-body row">
                    <div className="col">
                        <Image
                            src="/register-banner.jpg"
                            alt="register image"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                borderRadius: 4,
                            }}
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="col">
                        <form
                            method="POST"
                            action="/register-password"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label htmlFor="inputEmail" className="form-label">
                                Email<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                aria-describedby="inputEmailHelpBlock"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.email?.message?.toString()}
                                </p>
                            )}

                            <label
                                htmlFor="inputPassword"
                                className="form-label mt-2"
                            >
                                Password<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="password"
                                id="inputPassword"
                                className="form-control"
                                aria-describedby="inputPasswordHelpBlock"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.password?.message?.toString()}
                                </p>
                            )}

                            <p role="alert" style={{ color: "red" }}>
                                {getUnknownError(errors)}
                            </p>

                            <hr />
                            <button className="btn btn-primary m-2">
                                Login
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary m-2"
                                onClick={() => signIn("google", { callbackUrl: '/' })}
                            >
                                Google Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
