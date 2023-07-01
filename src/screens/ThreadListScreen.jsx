import { Button, Container, Form, ListGroup } from "react-bootstrap";
import DefaultLayout from "../layouts/DefaultLayout";
import ThreadListItem from "../components/ThreadListItem";
import { useEffect, useState } from "react";
import { PlusLg, Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ITEM_PER_PAGE = 10;

export default function ThreadListScreen() {
    const [threads, setThreads] = useState([]);
    const [totalCount, setTotalCount] = useState(0); 
    const [tagDict, setTagDict] = useState([]);
    const [pageIdx, setPageIdx] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:9999/threads?_page=${pageIdx}&_limit=${ITEM_PER_PAGE}`)
            .then((x) => {
                setTotalCount(x.headers.get("X-Total-Count"));
                return x.json();
            })
            .then((x) => setThreads(x));

        fetch("http://localhost:9999/tags")
            .then((x) => x.json())
            .then((x) => setTagDict(x));
    }, [pageIdx]);


    const handleChangePageIdx = (e) => {
        setPageIdx(e.target.value);
    };

    const pageCount = Math.ceil(totalCount / ITEM_PER_PAGE);
    const pages = [...Array(pageCount).keys()].map(x => x + 1);

    return (
        <DefaultLayout>
            <Container>
                <h1>DHub Forum</h1>
                <div className="tl-context-ctn">
                    <span>Page: </span>
                    <Form.Select style={{ width: "200px" }} value={pageIdx} onChange={handleChangePageIdx}>
                        {pages.map((x) => (
                            <option value={x} key={x}>
                                {x}
                            </option>
                        ))}
                    </Form.Select>

                    <Button variant="secondary" style={{ marginLeft: "auto" }}>
                        <Link to="/search" className="link-unstyled">
                            <Search />
                            Search
                        </Link>
                    </Button>
                    <Button variant="primary">
                        <Link to="/thread/new" className="link-unstyled">
                            <PlusLg />
                            New Thread
                        </Link>
                    </Button>
                </div>
                <ListGroup>
                    {threads.map((x) => (
                        <ThreadListItem key={x.id} thread={x} tagIds={x.tags} />
                    ))}
                </ListGroup>
            </Container>
        </DefaultLayout>
    );
}
