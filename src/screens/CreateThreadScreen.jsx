import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";

async function createNewThread(title, tagId, detail, userId) {
    const threadResp = await fetch("http://localhost:9999/theads", {
        method: "post",
        body: JSON.stringify({
            title,
            created: +new Date(),
            userId,
            tagId,
            views: 0,
        }),
    });

    const threadId = (await threadResp.json()).id;
    const postResp = await fetch("http://localhost:9999/posts", {
        method: "post",
        body: JSON.stringify({
            userId,
            threadId: threadId,
            content: detail,
        }),
    });

    const postId = (await postResp.json()).id;
    return [threadId, postId];
}

const CreateThreadScreen = () => {
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTag] = useState([]);
    const [chosenTag, setChosenTag] = useState(1);
    const [detail, setDetail] = useState("");
    const [title, setTitle] = useState("");
    const [user, setUser] = useState({});

    useEffect(() => {
        const userStore = window.localStorage.getItem("user");
        console.log(userStore);
        setUser(userStore)
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/tags")
            .then((x) => x.json())
            .then((x) => x.filter((at) => !selectedTags.find((st) => st.id === at.id)))
            .then((x) => {
                setTags(x);
                setChosenTag(x[0]?.id);
            });
        
        
    }, [selectedTags]);

    const handleCreate = () => {
        createNewThread(title);
    };

    const handleAddTag = () => {
        if (chosenTag > 0) {
            setSelectedTag([...selectedTags, tags.find((x) => x.id === chosenTag)]);
        }
    };

    const handleRemoveTag = (e) => {
        setSelectedTag(selectedTags.filter(x => x.id !== e));
    }

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-1 m-lg-5">
                    <Card.Header>
                        <Card.Title>New thread</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div>
                            <Form.Label>Thread title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter thread title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Form.Label>Thread tag</Form.Label>
                            <Form.Select value={chosenTag} onChange={(e) => setChosenTag(parseInt(e.target.value))}>
                                {tags.map((x) => (
                                    <option value={x.id} key={x.id}>
                                        {x.topic}
                                    </option>
                                ))}
                            </Form.Select>
                            <div>
                                {selectedTags.map((x) => (
                                    <Form.Check
                                        type="checkbox"
                                        key={x.id}
                                        label={x.topic}
                                        checked
                                        onClick={e => handleRemoveTag(x.id)}
                                    />
                                ))}
                            </div>

                            <Button type="submit" className="my-2" onClick={handleAddTag}>
                                Add tag
                            </Button>
                            <br />
                            <Form.Label>Post content</Form.Label>
                            <ReactQuill theme="snow" value={detail} onChange={setDetail} />
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        <Button type="submit" className="my-2" onClick={handleCreate}>
                            Submit
                        </Button>
                    </Card.Footer>
                </Card>
            </Container>
        </DefaultLayout>
    );
};

export default CreateThreadScreen;
