import { Col, ListGroup, Row } from "react-bootstrap";
import { Calendar, PersonFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import TagBadge from "./TagBadge";
import { useEffect, useState } from "react";

const ThreadListItem = ({ thread }) => {
    const { id, title, views, created, tagIds, userId } = thread;
    const [tags, setTags] = useState([]);
    const [author, setAuthor] = useState({});
    const [postCount, getPostCount] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:9999/tags?id=${tagIds?.join("&id=")}`)
            .then((x) => x.json())
            .then((x) => setTags(x));
    }, [tagIds]);

    useEffect(() => {
        fetch(`http://localhost:9999/users/${userId}`)
            .then((x) => x.json())
            .then((x) => setAuthor(x));
    }, [userId]);

    useEffect(() => {
        fetch(`http://localhost:9999/posts?threadId=${id}`)
            .then((x) => x.json())
            .then((x) => getPostCount(x.length));
    }, [id]);

    return (
        <ListGroup.Item>
            <Row>
                <Col xs={12} md={6}>
                    <Link to={`/thread/${id}`}>{title}</Link>
                    <div style={{ fontSize: 16 }}>
                        tags:{" "}
                        {tags.map((x) => (
                            <TagBadge key={x.id} tag={x} />
                        ))}
                    </div>
                </Col>
                <Col xs={12} md={4}>
                    <div>
                        <PersonFill /> {author.name}
                    </div>
                    <div style={{ fontSize: 16 }}>
                        <Calendar /> {new Date(created).toLocaleString()}
                    </div>
                </Col>
                <Col xs={12} md={2}>
                    <div>Posts: {postCount}</div>
                    <div style={{ fontSize: 16 }}>Views: {views}</div>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default ThreadListItem;
