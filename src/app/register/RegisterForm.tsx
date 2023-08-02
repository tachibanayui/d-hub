"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterDTO, registerDto } from "@/models/user.client";
import classNames from "classnames";
import { AiFillLock, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import { toast } from "@/reexports/reactToasify";
import { BsFillPersonFill } from "react-icons/bs";
import { useState } from "react";

const RegisterForm = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const { push } = useRouter();
    const { register, handleSubmit, watch, formState } = useForm<RegisterDTO>({
        resolver: zodResolver(registerDto),
    });
    const { errors } = formState;

    const onSubmit = async (data: RegisterDTO) => {
        setIsRegistering(true);
        try {
            const resp = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (resp.status >= 300) {
                const json = await resp.json();
                toast.error(json.message);
                setIsRegistering(false);
                return;
            }

            toast.success("Registered successfully!");
            push("/login");
        } catch (e) {
            toast.error("Registered successfully!");
        }
        setIsRegistering(false);
    };

    return (
        <form className={`row g-3`} onSubmit={handleSubmit(onSubmit)}>
            {/* Name input */}
            <div className="form-outline mb-4">
                <label htmlFor="inputName" className="form-label">
                    Full name<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group">
                    <span className="input-group-text">
                        <BsFillPersonFill />
                    </span>
                    <input
                        type="text"
                        className={classNames(
                            "form-control",
                            { "invalid-input": errors.name },
                            {
                                "valid-input":
                                    formState.isSubmitted && !errors.name,
                            }
                        )}
                        id="inputName"
                        required
                        {...register("name")}
                    />
                </div>
                <div role="alert" style={{ color: "red" }}>
                    {errors.name?.message?.toString()}
                </div>
                <div id="nameHelpBlock" className="form-text">
                    Your name will be displayed publicly on your posts and
                    comments.
                </div>
            </div>

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
                <div id="inputEmailHelpBlock" className="form-text">
                    Your email will be used to login our system.
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
                <div id="inputPasswordHelpBlock" className="form-text">
                    Your password must be 8-20 characters long, contain letters
                    and numbers.
                </div>
            </div>

            {/* Confirm Password input */}
            <div className="form-outline mb-4">
                <label htmlFor="inputRePassword" className="form-label">
                    Confirm Password<span style={{ color: "red" }}>*</span>
                </label>
                <div className="input-group ">
                    <span className="input-group-text">
                        <AiFillLock />
                    </span>
                    <input
                        type="password"
                        className={classNames(
                            "form-control",
                            { "invalid-input": errors.confirmPassword },
                            {
                                "valid-input":
                                    formState.isSubmitted &&
                                    !errors.confirmPassword,
                            }
                        )}
                        id="inputRePassword"
                        {...register("confirmPassword")}
                    />
                </div>
                <div role="alert" style={{ color: "red" }}>
                    {errors.confirmPassword?.message?.toString()}
                </div>
                <div id="inputPasswordHelpBlock" className="form-text">
                    Please confirm your password.
                </div>
            </div>

            <div className="d-flex">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="inputAgree"
                    required
                />
                <label htmlFor="inputAgree" className="form-check-label mx-2">
                    I agree to the <a href="#">term of services </a>
                </label>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="btn btn-primary btn-block mb-4"
                disabled={isRegistering}
            >
                {isRegistering && (
                    <span
                        className="spinner-grow spinner-grow-sm me-2"
                        aria-hidden="true"
                    />
                )}
                Sign up
            </button>

            {/* Register buttons */}
            <div className="text-center">
                <p>
                    Already a member? <Link href="/login">Login</Link>
                </p>
            </div>
        </form>
    );
};

export default RegisterForm;
