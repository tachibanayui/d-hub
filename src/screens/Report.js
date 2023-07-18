import { Button, Container, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
export default function Report() {
    const [userReports, setuserReport] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("all");
    const [user] = useUser();

    useEffect(() => {
        fetch("http://localhost:9999/users")
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/userReports")
            .then((res) => res.json())
            .then((result) => {
                if (userId === "all") setuserReport(result);
                else setuserReport(result.filter((p) => p.userId === userId));
            });
    }, [userId]);

    const handleDelete = (id) => {
        if (window.confirm("Do you want to remove product - ID: " + id + "?")) {
            fetch("http://localhost:9999/userReports/" + id, {
                method: "DELETE",
            })
                .then(() => {
                    // toast.success("Delete successfully!");
                    alert("Delete success");
                    setuserReport(userReports.filter((report) => report.id !== id));
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
                {user?.role == 1 && (
                    <Link to={"/report/create"}>
                        <Button variant="primary" style={{ marginLeft: "90%" }}>
                            New Report
                        </Button>
                    </Link>
                )}
                {user?.id >= 1 && (
                    <Table>
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Title</th>
                                <th scope="col">Comment</th>
                                <th scope="col">Content</th>
                                <th scope="col">Created</th>
                                <th scope="col">Status</th>
                                {user?.role >= 2 && (
                                    <React.Fragment>
                                        <th colSpan={2}>Action</th>
                                    </React.Fragment>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {userReports.map((c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.title}</td>
                                    <td>{c.comment}</td>
                                    <td>{c.content}</td>
                                    <td>{new Date(c.created).toLocaleDateString("en-US")}</td>

                                    <td>{c.status}</td>

                                    {user?.role >= 2 && (
                                        <React.Fragment>
                                            <td>
                                                <Link to={"report"} onClick={() => handleDelete(c.id)}>
                                                    Delete
                                                </Link>
                                            </td>
                                            <td>
                                                <Link to={"/report/edit/" + c.id}>Edit</Link>
                                            </td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Container>
        </DefaultLayout>
    );
}
