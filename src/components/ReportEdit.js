import { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
const ReportEdit = () => {
    const { tid } = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [comment, setComment] = useState("");
    const [created, setCreated] = useState("");
    const [status, setStatus] = useState("");
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [userId, setUserId] = useState("");



    useEffect(() => {
        fetch(" http://localhost:9999/userReports/" + tid)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setId(res.id);
                setContent(res.content);
                setComment(res.comment);
                setStatus(res.status);
                setTitle(res.title);
                setCreated(res.created);
                console.log(comment);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, title, created: new Date().toISOString(), content, comment, status };
        if (comment?.length === 0) {
            alert('Please fill all fields');
        }
        else {
            fetch(" http://localhost:9999/userReports/" + tid, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...empdata }),
            })
                .then(() => {
                    alert("Saved successfully.");

                    navigate("/report");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }

    };

    return (
        <Card>
            <Card.Header style={{ textAlign: "center" }}>
                Edit Report
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handlesubmit}>

                    <Form.Group >
                        <Form.Label>Comment<span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Control type="text" value={comment} onChange={(e => setComment(e.target.value))} />
                        {comment?.length == 0 && (
                            <label style={{ color: "red" }}>
                                Please enter the comment
                            </label>
                        )}
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>Status<span style={{ color: "red" }}>*</span></Form.Label>
                        <Form.Select value={status} onChange={e => setStatus(e.target.value)}>

                            <option >Approved</option>
                            <option>Reject</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit">Submit</Button>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Link to={"/report"}>Back to List</Link>
            </Card.Footer>
        </Card>
    );
}
export default ReportEdit;