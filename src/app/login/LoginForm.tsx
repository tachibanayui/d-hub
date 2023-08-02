"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginDTO, loginDto } from "@/models/user.client";
import { signIn } from "next-auth/react";
import classNames from "classnames";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { toast } from "@/reexports/reactToasify";
import { useState } from "react";

const LoginForm = ({ returnUrl }: LoginFormProps) => {
    const [isSigningIn, setIsLogging] = useState(false);
    const { push } = useRouter();
    const { register, handleSubmit, watch, formState } = useForm<LoginDTO>({
        resolver: zodResolver(loginDto),
    });
    const { errors } = formState;

    const onSubmit = async (data: LoginDTO) => {
        setIsLogging(true);
        try {
            const rs = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
                callbackUrl: "/login",
            });
            if (!rs?.ok) {
                toast.error(rs?.error);
                setIsLogging(false);
                return;
            }
            toast.success("Logged in successfully!");
            push(returnUrl ?? "/");
        } catch (e) {
            toast.error("" + e);
        }
        setIsLogging(false);
    };

    return (
        <form
            noValidate
            className={`row g-3`}
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Email input */}
            <div className="form-outline mb-4">
                <label htmlFor="inputEmail" className="form-label">
                    Email<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                    <span className="input-group-text">
                        <AiOutlineMail />
                    </span>
                    <input
                        type="email"
                        className={classNames(
                            "form-control",
                            { "invalid-input": errors.email },
                            {
                                "valid-input":
                                    formState.isSubmitted && !errors.email,
                            }
                        )}
                        id="inputEmail"
                        required
                        {...register("email")}
                    />
                </div>
                <div role="alert" style={{ color: "red" }}>
                    {errors.email?.message?.toString()}
                </div>
            </div>

            {/* Password input */}
            <div className="form-outline mb-4">
                <label htmlFor="inputPassword" className="form-label">
                    Password<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group ">
                    <span className="input-group-text">
                        <AiFillLock />
                    </span>
                    <input
                        type="password"
                        className={classNames(
                            "form-control",
                            { "invalid-input": errors.password },
                            {
                                "valid-input":
                                    formState.isSubmitted && !errors.password,
                            }
                        )}
                        id="inputPassword"
                        {...register("password")}
                    />
                </div>
                <div role="alert" style={{ color: "red" }}>
                    {errors.password?.message?.toString()}
                </div>
            </div>

            {/* 2 column grid layout */}
            <div className="row mb-4">
                <div className="col-md-6 d-flex justify-content-center">
                    {/* Checkbox */}
                    <div className="form-check mb-3 mb-md-0">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value="true"
                            id="loginCheck"
                        />
                        <label
                            className="form-check-label"
                            htmlFor="loginCheck"
                        >
                            Remember me
                        </label>
                    </div>
                </div>

                <div className="col-md-6 d-flex justify-content-center">
                    {/* Simple link */}
                    <Link href="/login">Forgot password?</Link>
                </div>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                disabled={isSigningIn}
            >
                {isSigningIn && (
                    <span
                        className="spinner-grow spinner-grow-sm me-2"
                        aria-hidden="true"
                    />
                )}
                Sign in
            </button>

            {/* Register buttons */}
            <div className="text-center">
                <p>
                    Not a member? <Link href="/register">Register</Link>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;

export interface LoginFormProps {
    returnUrl?: string;
}
