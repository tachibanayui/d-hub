import DefaultLayout from "../layouts/DefaultLayout";
import { Container } from 'react-bootstrap';
import { useEffect, useState } from "react"
export default function Report() {
    const [userReports, setuserReport] = useState([]);
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("all");
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
    return (
        <DefaultLayout>
            <Container>
                <h1>Report</h1>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Comment</th>
                            <th scope="col">Content</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userReports.map((c) => (
                                <tr>
                                    <td>{c.id}</td>
                                    <td>{c.title}</td>

                                    <td>{c.comment}</td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </Container>
        </DefaultLayout>
    );
}