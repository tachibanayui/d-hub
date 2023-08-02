"use client";
import { AiFillEdit, AiFillTags, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { EditTagDTO, editTagDto } from "@/models/tags.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/reexports/reactToasify";
import { useState } from "react";

const NewTag = ({ onTagCreated, isAllowed }: NewTagProps) => {
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditTagDTO>({
        resolver: zodResolver(editTagDto),
    });

    const onSubmit = async (data: EditTagDTO) => {
        setIsSaving(true);
        const rs = await fetch("/api/tag", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await rs.json();

        if (rs.ok) {
            toast.success(json.message);
        } else {
            toast.error(json.message);
        }
        onTagCreated?.(data, json.id);
        setIsSaving(false);
    };

    return (
        <div className="card">
            <div className="card-header">Add new tag</div>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="tag-name" className="form-label">
                            Topic
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <AiFillTags />
                            </span>
                            <input
                                className="form-control"
                                type="text"
                                id="tag-name"
                                placeholder="Enter tag topic..."
                                {...register("topic")}
                            />
                        </div>
                        <div className="form-text text-danger">
                            {errors.topic?.message}
                        </div>

                        <label
                            htmlFor="tag-description "
                            className="form-label"
                        >
                            Description
                        </label>
                        <textarea
                            className="form-control"
                            id="tag-description"
                            placeholder="Enter tag description..."
                            {...register("description")}
                        />
                        <div className="form-text text-danger">
                            {errors.description?.message}
                        </div>

                        <hr />
                        <button className="btn btn-primary" disabled={isSaving || !isAllowed}>
                            {isSaving ? (
                                <span
                                    className="spinner-grow spinner-grow-sm me-2"
                                    aria-hidden="true"
                                />
                            ) : (
                                <AiOutlinePlus />
                            )}{" "}
                            Add
                        </button>
                        {isAllowed || (<p className="text-danger">You are not allowed to create new tags</p>)}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewTag;

interface NewTagProps {
    onTagCreated?(data: EditTagDTO, id: string): void;
    isAllowed: boolean;
}
