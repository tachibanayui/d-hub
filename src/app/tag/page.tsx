import { getTags } from "@/models/tag";
import TagsEditor from "./TagsEditor";

const TagListPage = async () => {
    const tags = await getTags();

    return (
        <main>
            <div className="container-fluid p-3">
                <h1>Tag List</h1>
                <div className="row">
                    <TagsEditor initialTags={tags} />
                </div>
            </div>
        </main>
    );
};

export default TagListPage;
