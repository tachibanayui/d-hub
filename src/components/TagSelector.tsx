"use client";
import { AiFillTags } from "react-icons/ai";
import TagPill from "./TagPill";
import { Tag } from "@/models/tags.client";
import { useState } from "react";
import { id } from "date-fns/locale";

const TagSelector = ({
    store,
    selectedIds,
    onTagDeselected,
    onTagSelected,
}: TagSelectorProps) => {
    const [sel, setSel] = useState<string | undefined>();

    const handleAdd = () => {
        sel && onTagSelected?.(sel);
        setSel(undefined);
    }

    return (
        <div className="form-outline mb-4">
            <label htmlFor="inputBgImage" className="form-label">
                Thread tags
            </label>

            <div className="input-group">
                <span className="input-group-text">
                    <AiFillTags />
                </span>
                <select
                    className="form-control"
                    value={sel}
                    onChange={(e) => setSel(e.target.value)}
                >
                    <option key={-1} value={undefined}>
                        Select tag...
                    </option>

                    {store.filter(x => !selectedIds.includes(x.id)).map((x) => (
                        <option key={x.id} value={x.id}>
                            {x.topic}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => handleAdd()}
                >
                    Add
                </button>
            </div>
            <div className="border rounded p-2 mt-1">
                <i>Selected tags: </i>
                <hr className="mt-2" />
                <div
                    className="d-flex flex-row "
                    style={{
                        flexWrap: "wrap",
                        columnGap: "1.5rem",
                        cursor: "pointer",
                    }}
                >
                    {selectedIds.map((x) => (
                        <div className="form-check" key={x}>
                            <input
                                id={`tag-selector-item-${x}`}
                                type="checkbox"
                                className="form-check-input"
                                checked={true}
                                onChange={() => onTagDeselected?.(x)}
                                style={{ cursor: "pointer" }}
                            />
                            <label
                                htmlFor={`tag-selector-item-${x}`}
                                className="form-check-label"
                            >
                                <TagPill
                                    key={x}
                                    data={store.find((f) => f.id === x) as Tag}
                                />
                            </label>
                        </div>
                    ))}

                    {selectedIds.length === 0 && (
                        <div className="text-muted">
                            No tags selected.{" "}
                            <i>
                                Select a tag from the dropdown above to add it
                                to the thread.
                            </i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TagSelector;

export interface TagSelectorProps {
    store: Tag[];
    selectedIds: string[];
    onTagSelected?(id: string): void;
    onTagDeselected?(id: string): void;
}
