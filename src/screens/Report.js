import DefaultLayout from "../layouts/DefaultLayout";

import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Report() {
    const [userReports, setuserReport] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("all");
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:9999/users")
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/userReports")
            .then((resp) => resp.json())
            .then((data) => {
                setuserReport(data);
            });
    }, []);
    const handleDelete = (id) => {
        if (window.confirm("Do you want to remove product - ID: " + id + "?")) {
            fetch("http://localhost:9999/userReports/" + id, {
                method: "DELETE",
            })
                .then(() => {
                    alert("Delete success");

                    navigate('/report')
                })
                .catch((err) => {
                    console.log(err.message);
                });

        }

    };
    return (
        <DefaultLayout>
            <Container>
                <h1>Report</h1>
                <Link to={"/report/create"} ><Button variant="primary" style={{ marginLeft: "90%" }}>New Report</Button></Link>
                <Table>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Comment</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userReports.map((c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.title}</td>
                                    <td>{c.comment}</td>
                                    <td>{c.content}</td>
                                    <td>{new Date(c.created).toLocaleDateString("en-US")}</td>
                                    <td>{c.status}</td>
                                    <td><Link to={"/report"} onClick={() => handleDelete(c.id)}>Delete</Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        </DefaultLayout>
    );
}