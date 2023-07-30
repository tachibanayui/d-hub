"use client";
import Image from "next/image";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RegisterDTO, registerDto, usernameZod } from "@/models/user.client";
import { getUnknownError } from "@/utils/reactHookForm";



const RegisterPage = () => {
    const { push } = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterDTO>({
        resolver: zodResolver(registerDto),
    });

    const onSubmit = async (data: RegisterDTO) => {
        try {
            const resp = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (resp.status > 300) {
                const json = await resp.json();
                throw new Error(json.message);
            }

            alert("Registered successfully!");
            push("/login");
        } catch (e) {
            alert("Error: " + e);
        }
    };

    return (
        <main className="container ">
            <div className="card m-3">
                <div className="card-header">
                    <h1>Register</h1>
                </div>
                <div className="card-body row">
                    <div className="col  d-none d-lg-block">
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
                            <label htmlFor="inputName" className="form-label">
                                Name<span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="text"
                                id="inputName"
                                className="form-control"
                                aria-describedby="nameHelpBlock"
                                {...register("name")}
                            />
                            <div id="nameHelpBlock" className="form-text">
                                Your name will be displayed publicly on your
                                posts and comments.
                            </div>
                            {errors.name && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.name?.message?.toString()}
                                </p>
                            )}

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
                            <div id="inputEmailHelpBlock" className="form-text">
                                Your email will be used to login our system.
                            </div>
                            {errors.email && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.email?.message?.toString()}
                                </p>
                            )}

                            <label
                                htmlFor="inputPassword"
                                className="form-label"
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
                            <div
                                id="inputPasswordHelpBlock"
                                className="form-text"
                            >
                                Your password must be 8-20 characters long,
                                contain letters and numbers.
                            </div>
                            {errors.password && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.password?.message?.toString()}
                                </p>
                            )}

                            <label
                                htmlFor="inputRePassword"
                                className="form-label"
                            >
                                Confirm Password
                                <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                                required
                                type="password"
                                id="inputRePassword"
                                className="form-control"
                                aria-describedby="inputRePasswordHelpBlock"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (val: string) => {
                                        if (watch("password") != val) {
                                            return "Your passwords do no match";
                                        }
                                    },
                                })}
                            />
                            <div
                                id="inputRePasswordHelpBlock"
                                className="form-text"
                            >
                                Please confirm your password.
                            </div>
                            {errors.confirmPassword && (
                                <p role="alert" style={{ color: "red" }}>
                                    {errors.confirmPassword?.message?.toString()}
                                </p>
                            )}

                            <p role="alert" style={{ color: "red" }}>
                                {getUnknownError(errors)}
                            </p>

                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="inputAgree"
                                required
                            />
                            <label
                                htmlFor="inputAgree"
                                className="form-check-label mx-2"
                            >
                                I agree to the <a href="#">term of services </a>
                            </label>

                            <hr />
                            <button className="btn btn-primary m-2">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default RegisterPage;
