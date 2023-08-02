"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import {
    AiOutlineMail,
    AiOutlineSend,
    AiFillMessage,
    AiOutlineCloudUpload,
} from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";
import { CreateThreadDTO, createThreadDto } from "@/models/thread.client";
import ThreadHero from "@/components/ThreadHero";
import PostCard from "@/components/PostCard";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";


import { CldUploadWidget } from "next-cloudinary";
import { Tag } from "@/models/tags.client";
import TagSelector from "@/components/TagSelector";
import { useSession } from "@/reexports/nextAuthReact";
import { ProfileDB, roleNumberToString } from "@/models/user.client";
import { toast } from "@/reexports/reactToasify";
import { useState } from "react";



const NewThreadWizard = ({ tags, userProfile }: NewThreadWizardProps) => {
    const [isCreating, setIsCreating] = useState(false);
    const session = useSession();
    const { push } = useRouter();
    const { register, handleSubmit, watch, formState, setValue } =
        useForm<CreateThreadDTO>({
            resolver: zodResolver(createThreadDto),
            defaultValues: {
                tagIds: [],
            },
        });
    const { errors } = formState;
    const username = session?.data?.user?.name ?? "Loading";

    const onNewThread = async (data: CreateThreadDTO) => {
        console.log(data);
        setIsCreating(true);
        const res = await fetch("/api/thread", {
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
            push(`/thread/${json.threadId}`);
        }

        setIsCreating(false);
    };

    return (
        <div className="fill row m-0">
            <div className="col-12 col-lg-6 p-2 p-lg-5">
                {/* Form */}
                <h1 className="display-5">Create new thread</h1>
                <hr />
                <form className="p-3" onSubmit={handleSubmit(onNewThread)}>
                    {/* Title input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputTitle" className="form-label">
                            Thread Title<span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <AiFillMessage />
                            </span>
                            <input
                                type="text"
                                className={classNames(
                                    "form-control",
                                    { "invalid-input": errors.title },
                                    {
                                        "valid-input":
                                            formState.isSubmitted &&
                                            !errors.title,
                                    }
                                )}
                                id="inputTitle"
                                required
                                {...register("title")}
                            />
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.title?.message?.toString()}
                        </div>
                    </div>

                    {/* Background input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputBgImage" className="form-label">
                            Thread background image
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <BsCardImage />
                            </span>
                            <input
                                type="text"
                                className={classNames(
                                    "form-control",
                                    { "invalid-input": errors.backgroundImg },
                                    {
                                        "valid-input":
                                            formState.isSubmitted &&
                                            !errors.backgroundImg,
                                    }
                                )}
                                id="inputBackgroundImg"
                                {...register("backgroundImg")}
                            />
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.backgroundImg?.message?.toString()}
                        </div>

                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={watch("backgroundImg")}
                            alt="background image"
                            style={{
                                width: "100%",
                                height: "300px",
                                display: "block",
                            }}
                            className="img img-fluid my-2 rounded object-fit-cover border"
                        />

                        <CldUploadWidget
                            uploadPreset="dhub-pfp"
                            options={{
                                maxFileSize: 10000000,
                                singleUploadAutoClose: true,
                                showPoweredBy: false,
                                croppingAspectRatio: 1,
                                showUploadMoreButton: false,
                            }}
                            onUpload={(params: any) => {
                                if (params.event === "success") {
                                    const url = params?.info?.url;
                                    if (url) {
                                        setValue("backgroundImg", url);
                                    }
                                }
                            }}
                        >
                            {({ open }) => (
                                <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={() => open()}
                                >
                                    <AiOutlineCloudUpload />
                                    Upload image
                                </button>
                            )}
                        </CldUploadWidget>
                    </div>

                    <TagSelector
                        store={tags}
                        selectedIds={watch("tagIds") ?? []}
                        onTagSelected={(e) =>
                            setValue("tagIds", [...watch("tagIds"), e])
                        }
                        onTagDeselected={(e) =>
                            setValue(
                                "tagIds",
                                watch("tagIds").filter((x) => x !== e)
                            )
                        }
                    />

                    {/* Content input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputContent" className="form-label">
                            Thread Content
                            <span style={{ color: "red" }}>*</span>
                        </label>
                        <ReactQuill
                            id="inputContent"
                            theme="snow"
                            value={watch("content")}
                            onChange={(e) => setValue("content", e)}
                            placeholder="Write something..."
                        />
                        <div role="alert" style={{ color: "red" }}>
                            {errors.title?.message?.toString()}
                        </div>
                    </div>

                    <hr />

                    <div className="d-flex gap-2">
                        <button
                            disabled={isCreating}
                            type="submit"
                            className="btn btn-primary btn-block mb-4"
                        >
                            {isCreating ? (
                                <span
                                    className="spinner-grow spinner-grow-sm me-2"
                                    aria-hidden="true"
                                />
                            ) : (
                                <AiOutlineSend />
                            )}{" "}
                            Create
                        </button>

                        <button
                            disabled={isCreating}
                            type="submit"
                            className="btn btn-outline-danger btn-block mb-4"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>

            <div className="col-12 col-lg-6 bg-light p-2 p-lg-5 position-relative">
                <div className="sticky-top" style={{
                    zIndex: 1,
                    top: '4.5rem'
                }}>
                    {/* Preview */}
                    <h1 className="display-5">Thread preview: </h1>
                    <i>Here&apos;s how your post going to look like </i>

                    <ThreadHero
                        data={{
                            ...watch(),
                            id: "0",
                            created: new Date(),
                            view: 96024,
                            userId: "0",
                        }}
                        tagStore={tags}
                        authorName={username}
                    />
                    <div className="my-3"></div>
                    <PostCard
                        showActions
                        isEdit={false}
                        user={{
                            name: username,
                            profileImg: userProfile.profileImg,
                            role: roleNumberToString(userProfile.role),
                            motto: userProfile.motto,
                        }}
                        post={{
                            id: "0",
                            created: new Date(),
                            content: watch("content"),
                            threadId: "0",
                            userId: "0",
                            dislikes: [],
                            likes: [],
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewThreadWizard;

export interface NewThreadWizardProps {
    tags: Tag[];
    userProfile: ProfileDB;
}
