import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Card } from "react-bootstrap";

export default function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchPostDetails = async () => {
            try {
                const postResponse = await fetch(`http://localhost:9999/posts/${postId}`);
                const postData = await postResponse.json();
                setPost(postData);

                const userResponse = await fetch(`http://localhost:9999/users/${postData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (!post || !user) {
        return <p>Loading...</p>;
    }

    return (
        <DefaultLayout>
            <Container>
                <h2>Post Details</h2>
                <Card>
                    <Card.Body>
                        <Card.Title>{post.titlePost}</Card.Title>
                        <Card.Text>Author: {user.name}</Card.Text>
                        <Card.Text>Content: {post.content}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        </DefaultLayout>
    );
}
