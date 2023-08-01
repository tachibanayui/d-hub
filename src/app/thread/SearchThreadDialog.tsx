"use client";
import { Tag } from "@/models/tags.client";
import { SearchThreadDTO, searchThreadDto } from "@/models/thread.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUserEdit } from "react-icons/fa";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import {
    AiFillCalendar,
    AiFillMessage,
    AiOutlineCalendar,
    AiOutlinePlus,
} from "react-icons/ai";
import TagSelector from "../../components/TagSelector";
import Link from "next/link";

const SearchThreadDialog = ({ tagStore }: SearchThreadDialogProps) => {
    const { register, handleSubmit, watch, formState, setValue } =
        useForm<SearchThreadDTO>({
            resolver: zodResolver(searchThreadDto),
            defaultValues: {
                tagIds: [],
            },
        });
    const { errors } = formState;

    return (
        <section className="card">
            <div className="card-header navbar">
                <h3>Search threads</h3>
                <Link href="/thread/new" className="btn btn-primary">
                    <AiOutlinePlus />
                    New thread
                </Link>
            </div>
            <div className="card-body">
                <form>
                    {/* Title input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputTitle" className="form-label">
                            Thread Title
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
                                {...register("title")}
                            />
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.title?.message?.toString()}
                        </div>
                    </div>

                    {/* Author input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputAuthor" className="form-label">
                            Thread Author
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaUserEdit />
                            </span>
                            <input
                                type="text"
                                className={classNames(
                                    "form-control",
                                    { "invalid-input": errors.author },
                                    {
                                        "valid-input":
                                            formState.isSubmitted &&
                                            !errors.author,
                                    }
                                )}
                                id="inputAuthor"
                                {...register("author")}
                            />
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.author?.message?.toString()}
                        </div>
                    </div>

                    <TagSelector
                        store={tagStore}
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

                    {/* after input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputAfter" className="form-label">
                            After
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <AiOutlineCalendar />
                            </span>
                            <input
                                type="date"
                                className={classNames(
                                    "form-control",
                                    { "invalid-input": errors.title },
                                    {
                                        "valid-input":
                                            formState.isSubmitted &&
                                            !errors.title,
                                    }
                                )}
                                id="inputAfter"
                                {...register("after")}
                            />
                            <button type="button" className="btn btn-primary">
                                Clear
                            </button>
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.after?.message?.toString()}
                        </div>
                    </div>

                    {/* before input */}
                    <div className="form-outline mb-4">
                        <label htmlFor="inputBefore" className="form-label">
                            Before
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <AiFillCalendar />
                            </span>
                            <input
                                type="date"
                                className={classNames(
                                    "form-control",
                                    { "invalid-input": errors.before },
                                    {
                                        "valid-input":
                                            formState.isSubmitted &&
                                            !errors.before,
                                    }
                                )}
                                id="inputBefore"
                                {...register("before")}
                            />
                            <button type="button" className="btn btn-primary">
                                Clear
                            </button>
                        </div>
                        <div role="alert" style={{ color: "red" }}>
                            {errors.before?.message?.toString()}
                        </div>
                    </div>

                    <hr />
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary">
                            Search threads
                        </button>
                        <button className="btn btn-outline-danger">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SearchThreadDialog;

export interface SearchThreadDialogProps {
    tagStore: Tag[];
}
