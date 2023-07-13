import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Container, Card, ListGroup } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function ThreadDetailScreen() {
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;

    useEffect(() => {
        const fetchThreadDetails = async () => {
            try {
                const threadResponse = await fetch(`http://localhost:9999/threads/${threadId}`);
                const threadData = await threadResponse.json();
                setThread(threadData);

                const postsResponse = await fetch(`http://localhost:9999/posts?threadId=${threadId}`);
                const postsData = await postsResponse.json();
                setPosts(postsData);

                // Fetch user data for each post
                const userIds = postsData.map((post) => post.userId);
                const uniqueUserIds = Array.from(new Set(userIds));
                const usersResponse = await Promise.all(uniqueUserIds.map((userId) => fetchUser(userId)));
                const usersData = await Promise.all(usersResponse.map((response) => response.json()));
                setUsers(usersData);

                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchThreadDetails();
    }, [threadId]);

    const fetchUser = async (userId) => {
        const response = await fetch(`http://localhost:9999/users/${userId}`);
        return response;
    };

    const getUserById = (userId) => {
        return users.find((user) => user.userId === userId);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

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
                                    <Row>
                                        <Col xs={12} md={2}>
                                            <Link to={`/post/${post.id}`}></Link>
                                            <Card.Text>
                                                {getUserById(post.userId)?.name} <br />
                                                {post.userId === 1 && "User"}
                                                {post.userId === 2 && "Moderator"}
                                                {post.userId === 3 && "Admin"}
                                            </Card.Text>
                                        </Col>
                                        <Col xs={12} md={10}>
                                            <Card.Text>
                                                <h4>{post.title}</h4>
                                            </Card.Text>
                                            {post.content}
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </Container>
        </DefaultLayout>
    );
}

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            href="#"
                            onClick={() => paginate(number)}
                            className={`page-link ${currentPage === number ? "active" : ""}`}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
