"use client";
import { useForm } from "react-hook-form";
import { EditProfileDTO, editProfileDto } from "@/models/user.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ToastContainer, toast } from "@/reexports/reactToasify";
import { useSession } from "@/reexports/nextAuthReact";

const ProfileEditor = ({
    profileId,
    profileData,
    email,
}: ProfileEditorProps) => {
    const session = useSession();
    const role = session.data?.user?.role ?? 1;
    const isEditAllowed = role >= 2 || session.data?.user?.id === profileId;

    const [isSending, setIsSending] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileDTO>({
        resolver: zodResolver(editProfileDto),
        defaultValues: profileData,
    });

    const onSubmit = async (data: EditProfileDTO) => {
        try {
            setIsSending(true);
            const res = await fetch(`/api/profile/${profileId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const json = await res.json();

            if (res.status >= 300) {
                toast.error(json.message);
            } else {
                toast.success(json.message);
            }

            setIsSending(false);
        } catch (e) {
            toast.error("An error occurred while saving your profile.");
            setIsSending(false);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputUsername">
                            Full name (how it will appear to other users on the
                            site)
                        </label>
                        <input
                            className="form-control"
                            id="inputUsername"
                            type="text"
                            placeholder="Enter your username"
                            disabled={!isEditAllowed}
                            {...register("username")}
                        />
                        {errors.username && (
                            <p className="text-danger">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="row gx-3 mb-3">
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputMotto">
                                Motto
                            </label>
                            <input
                                className="form-control"
                                id="inputMotto"
                                disabled={!isEditAllowed}
                                type="text"
                                placeholder="Enter your motto"
                                {...register("motto")}
                            />
                        </div>
                        <div className="col-md-6">
                            <label
                                className="small mb-1"
                                htmlFor="inputLocation"
                            >
                                Location
                            </label>
                            <input
                                className="form-control"
                                id="inputLocation"
                                disabled={!isEditAllowed}
                                type="text"
                                placeholder="Enter your location"
                                {...register("location")}
                            />
                        </div>
                        {errors.location && (
                            <p className="text-danger">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
                    {/* Form Group (email address)*/}
                    <div className="mb-3">
                        <label
                            className="small mb-1"
                            htmlFor="inputEmailAddress"
                        >
                            Email address
                        </label>
                        <input
                            className="form-control"
                            id="inputEmailAddress"
                            type="email"
                            placeholder="Enter your email address"
                            disabled
                            value={email}
                        />
                    </div>
                    {/* Form Row*/}
                    <div className="row gx-3 mb-3">
                        {/* Form Group (phone number)*/}
                        <div className="col-md-6">
                            <label className="small mb-1" htmlFor="inputPhone">
                                Phone number
                            </label>
                            <input
                                className="form-control"
                                id="inputPhone"
                                type="tel"
                                placeholder="Enter your phone number"
                                {...register("phone")}
                                disabled={!isEditAllowed}
                            />
                        </div>
                        {errors.phone && (
                            <p className="text-danger">
                                {errors.phone.message}
                            </p>
                        )}
                        {/* Form Group (birthday)*/}
                        <div className="col-md-6">
                            <label
                                className="small mb-1"
                                htmlFor="inputBirthday"
                            >
                                Date of Birth
                            </label>
                            <input
                                className="form-control"
                                id="inputBirthday"
                                type="date"
                                placeholder="Enter your date of birth"
                                {...register("dob")}
                                disabled={!isEditAllowed}
                            />
                            {errors.dob && (
                                <p className="text-danger">
                                    {errors.dob.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Save changes button*/}
                    {isEditAllowed && (
                        <button
                            className="btn btn-primary"
                            disabled={isSending}
                        >
                            {isSending && (
                                <span
                                    className="spinner-grow spinner-grow-sm me-2"
                                    aria-hidden="true"
                                />
                            )}
                            <span>
                                {isSending ? "Saving..." : "Save profile"}
                            </span>
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfileEditor;

export interface ProfileEditorProps {
    profileId: string;
    profileData: EditProfileDTO;
    email: string;
}
