import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Card, ListGroup } from "react-bootstrap";

export default function ThreadDetailScreen() {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const [tagDict, setTagDict] = useState([]);

    useEffect(() => {
        const fetchThreadDetails = async () => {
            try {
                const threadResponse = await fetch(`http://localhost:9999/threads/${threadId}`);
                const threadData = await threadResponse.json();
                setThread(threadData);

                const postsResponse = await fetch(`http://localhost:9999/posts?threadId=${threadId}`);
                const postsData = await postsResponse.json();
                setPosts(postsData);

                const userResponse = await fetch(`http://localhost:9999/users/${threadData.userId}`);
                const userData = await userResponse.json();
                setUser(userData);

                // Update view count in the database
                const updatedThreadResponse = await fetch(`http://localhost:9999/threads/${threadId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        views: threadData.views + 1,
                    }),
                });
                const updatedThreadData = await updatedThreadResponse.json();
                setThread(updatedThreadData);

                const tagsResponse = await fetch(`http://localhost:9999/tags`);
                const tagsData = await tagsResponse.json();
                setTagDict(tagsData);
            } catch (error) {
                console.log(error);
            }
        };

        fetchThreadDetails();
    }, [threadId]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (!thread || !user) {
        return <p>Loading...</p>;
    }

    // Tính toán các bài viết trên trang hiện tại
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Tính toán số trang
    const totalPages = Math.ceil(posts.length / postsPerPage);

    return (
        <DefaultLayout>
            <Container>
                <h2>Thread Details</h2>
                <Card>
                    <Card.Body>
                        <Card.Title>{thread.title}</Card.Title>
                        <Card.Text>Created: {new Date(thread.created).toLocaleString()}</Card.Text>
                        <Card.Text>Views: {thread.views}</Card.Text>
                    </Card.Body>
                </Card>

                <h3>Posts</h3>
                <ListGroup>
                    {currentPosts.map((post) => (
                        <ListGroup.Item key={post.id}>
                            <Card>
                                <Card.Body>
                                    <Link to={`/post/${post.id}`}>
                                        <Card.Text>
                                            <h4>Content: {post.content}</h4>
                                        </Card.Text>
                                    </Link>
                                    <Card.Text>
                                        User: {user.name} <br />
                                        Tags: {tagDict[post.tagId]}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* Hiển thị phân trang */}
                {totalPages > 1 && (
                    <div>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </Container>
        </DefaultLayout>
    );
}
