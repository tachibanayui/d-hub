import DefaultLayout from "../layouts/DefaultLayout";
import ReactQuill from "react-quill";
import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useUser } from "../hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";

async function createNewPost(userId, threadId, title, content) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const postResp = await fetch("http://localhost:9999/posts", {
        method: "POST",
        headers,
        body: JSON.stringify({
            userId,
            threadId,
            title,
            content,
        }),
    });

    const postId = (await postResp.json()).id;
    return postId;
}

const CreatePostScreen = () => {
    const { threadId } = useParams();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [user] = useUser();
    const navigate = useNavigate();

    const handleCreate = () => {
        if (!user) {
            navigate("/login");
            return;
        }

        createNewPost(user.id, threadId, title, content).then((postId) => {
            navigate(`/thread/${threadId}#${postId}`);
        });
    };

    return (
        <DefaultLayout>
            <Container>
                <Card className="m-1 m-lg-5">
                    <Card.Header>
                        <Card.Title>New Post</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Post Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter post title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formContent">
                                <Form.Label>Post Content</Form.Label>
                                <ReactQuill theme="snow" value={content} onChange={setContent} />
                            </Form.Group>
                        </Form>
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

export default CreatePostScreen;
