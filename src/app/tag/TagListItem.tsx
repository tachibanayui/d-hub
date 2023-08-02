import { EditTagDTO, editTagDto, Tag } from "@/models/tags.client";
import { useEffect } from "react";
import { AiFillEdit, AiFillTags, AiFillSave } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/reexports/reactToasify";
import { useState } from "react";
import { formatRelative } from "date-fns";

const TagListItem = ({
    showAction,
    data,
    onDeleted,
    onEdited,
}: TagListItemProps) => {
    const [isSaving, setIsSaving] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EditTagDTO>({
        resolver: zodResolver(editTagDto),
        defaultValues: data,
    });

    const handleEdit = async (formData: EditTagDTO) => {
        setIsSaving(true);
        const rs = await fetch(`/api/tag/${data.id}`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const json = await rs.json();

        if (rs.ok) {
            toast.success(json.message);
            onEdited?.(formData);
        } else {
            toast.error(json.message);
        }

        setIsSaving(false);
    };

    const handleDelete = async () => {
        setIsSaving(true);
        const rs = await fetch(`/api/tag/${data.id}`, {
            method: "DELETE",
        });

        const json = await rs.json();
        if (rs.ok) {
            toast.success(json.message);
            onDeleted?.();
        } else {
            toast.error(json.message);
        }

        setIsSaving(false);
    };

    return (
        <tr>
            <th>{data.id}</th>
            <td>{data.topic}</td>
            <td>
                <pre>{data.description}</pre>
            </td>
            <td>{formatRelative(data.created, new Date())}</td>

            {showAction && (
                <>
                    <td>
                        <button
                            className="btn btn-danger"
                            disabled={isSaving}
                            onClick={handleDelete}
                        >
                            {isSaving ? (
                                <span
                                    className="spinner-grow spinner-grow-sm me-2"
                                    aria-hidden="true"
                                />
                            ) : (
                                <BsFillTrashFill />
                            )}{" "}
                            Delete
                        </button>
                    </td>
                    <td>
                        <button
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#editTagModal+${data.id}`}
                        >
                            <AiFillEdit /> Edit
                        </button>
                        <div
                            className="modal fade "
                            id={`editTagModal+${data.id}`}
                            tabIndex={-1}
                            aria-labelledby={`editTagModal+${data.id}`}
                            aria-hidden="true"
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1
                                            className="modal-title fs-5"
                                            id="exampleModalLabel"
                                        >
                                            Edit tag
                                        </h1>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        />
                                    </div>
                                    <div className="modal-body">
                                        <form
                                            onSubmit={handleSubmit(handleEdit)}
                                        >
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="tag-name"
                                                    className="form-label"
                                                >
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
                                                    {
                                                        errors.description
                                                            ?.message
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            disabled={isSaving}
                                            onClick={handleSubmit(handleEdit)}
                                        >
                                            {isSaving ? (
                                                <span
                                                    className="spinner-grow spinner-grow-sm me-2"
                                                    aria-hidden="true"
                                                />
                                            ) : (
                                                <AiFillSave />
                                            )}{" "}
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </>
            )}
        </tr>
    );
};

export default TagListItem;

interface TagListItemProps {
    data: Tag;
    showAction: boolean;
    onEdited?: (data: EditTagDTO) => void;
    onDeleted?: () => void;
}
