"use client";
import { useForm } from "react-hook-form";
import { EditProfileDTO, editProfileDto } from "@/models/user.client";
import { zodResolver } from "@hookform/resolvers/zod";

const ProfileEditor = ({ profileId, profileData, email }: ProfileEditorProps) => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<EditProfileDTO>({
        resolver: zodResolver(editProfileDto),
        values: profileData,
    });

    const onSubmit = async (data: EditProfileDTO) => {
        const res = await fetch(`/api/profile/${profileId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (res.status >= 300) {
            const json = await res.json();
            alert(json.message);
            return;
        }

        console.log(res);
    };

    return (
        <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="small mb-1" htmlFor="inputUsername">
                            Full name (how your name will appear to other users
                            on the site)
                        </label>
                        <input
                            className="form-control"
                            id="inputUsername"
                            type="text"
                            placeholder="Enter your username"
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
                            />
                            {errors.dob && (
                                <p className="text-danger">
                                    {errors.dob.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {/* Save changes button*/}
                    <button className="btn btn-primary">Save changes</button>
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
