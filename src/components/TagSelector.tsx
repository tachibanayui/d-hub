"use client";
import {AiFillTags} from "react-icons/ai";

const TagSelector = ({tags}: TagSelectorProps) => {
    return (
        <div>
            <label htmlFor="tag-selector">Tags</label>
            <div className="input-group">
                <span className="input-group-text">
                    <AiFillTags />
                </span>
                <input
                    className="form-control"
                    type="text"
                    id="tags-selector"
                    placeholder="Select tags..."
                />
                <button className="btn btn-primary">+</button>
            </div>
        </div>
    );
};

export default TagSelector;

export interface TagSelectorProps {
    tags: string[];
}
