"use client";
import NewTag from "./NewTag";
import { EditTagDTO, Tag } from "@/models/tags.client";
import { useEffect, useState } from "react";
import TagListItem from "./TagListItem";
import { MdRefresh } from "react-icons/md";
import { useSession } from "@/reexports/nextAuthReact";

const TagsEditor = ({ initialTags }: TagsEditorProps) => {
    const session = useSession();
    const role = session.data?.user?.role ?? 1;

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [tags, setTags] = useState<Tag[]>(initialTags);

    const handleTagCreated = (data: EditTagDTO, id: string) => {
        setTags((x) => [
            ...x,
            {
                id,
                topic: data.topic,
                description: data.description,
                created: new Date(),
            },
        ]);
    };

    const handleRefresh = async () => {
        setIsRefreshing(true);
        const resp = await fetch("/api/tag");
        const json = await resp.json();
        setTags(json.data.map((x: any) => ({...x, created: new Date((x as any).created) })));
        setIsRefreshing(false);
    };

    return (
        <div className="row">
            <div className="col col-sx-12 col-md-8">
                <div className="row">
                    <div className="d-flex justify-content-space-around gap-5">
                        <div className="input-group">
                            <span className="input-group-text">
                                Search tags
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Start typing..."
                            />
                        </div>
                        <button
                            className="btn btn-primary"
                            disabled={isRefreshing}
                            style={{ flex: "0 0 auto" }}
                            onClick={handleRefresh}
                        >
                            {isRefreshing ? (
                                <span
                                    className="spinner-grow spinner-grow-sm me-2"
                                    aria-hidden="true"
                                />
                            ) : (
                                <MdRefresh />
                            )}{" "}
                            Refresh
                        </button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col" style={{ minWidth: 150 }}>
                                    Topic
                                </th>
                                <th scope="col">Decription</th>
                                <th scope="col" style={{ minWidth: 300 }}>
                                    Created
                                </th>
                                {role >= 2 && (
                                    <th
                                        scope="col"
                                        style={{ minWidth: 275 }}
                                        colSpan={2}
                                    >
                                        Action
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {tags.map((x) => (
                                <TagListItem
                                    showAction={role >= 2}
                                    key={x.id}
                                    data={x}
                                    onDeleted={() =>
                                        setTags(
                                            tags.filter((f) => f.id !== x.id)
                                        )
                                    }
                                    onEdited={(data) => {
                                        setTags(
                                            tags.map((f) =>
                                                f.id === x.id
                                                    ? {
                                                          ...f,
                                                          ...data,
                                                      }
                                                    : f
                                            )
                                        );
                                    }}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
                {tags.length === 0 && <p>No tags found!</p>}
            </div>
            <div className="col col-sx-12 col-md-4">
                <NewTag onTagCreated={handleTagCreated} isAllowed={role >= 2} />
            </div>
        </div>
    );
};

export default TagsEditor;

interface TagsEditorProps {
    initialTags: Tag[];
}
