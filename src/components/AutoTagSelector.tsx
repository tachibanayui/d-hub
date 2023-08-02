import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";
import { Tag } from "@/models/tags.client";

const AutoTagSelector = () => {
    const [tags, setTags] = useState([] as Tag[]);
    const [selTags, setSelTags] = useState([] as string[]);

    useEffect(() => {
        fetch("/api/tag")
            .then((x) => x.json())
            .then((x) =>
                x.data.map((x: any) => ({
                    ...x,
                    created: new Date((x as any).created),
                }))
            )
            .then((x) => setTags(x));
    }, []);

    return (
        <TagSelector
            store={tags}
            selectedIds={selTags}
            onTagSelected={(e) => setSelTags([...selTags, e])}
            onTagDeselected={(e) => setSelTags(selTags.filter((x) => x !== e))}
        />
    );
};

export default AutoTagSelector;
