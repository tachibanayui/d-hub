import { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const CreateReport = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [created, setCreated] = useState("");
    const [content, setContent] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault();
        const empdata = { id, title, created: new Date().toISOString(), description: content };
        if (title.length === 0 || content.length === 0) {
            alert('Please fill all fields');
        } else {
            fetch("http://localhost:9999/userReports", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...empdata, views: 0 }),
            })
                .then(() => {
                    alert("Add Report successfully.");
                    navigate("/report");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    return (
        <Card>
            <Card.Header style={{ textAlign: "center" }}>Create Report</Card.Header>
            <Card.Body>
                <Form onSubmit={handlesubmit}>



                    <Form.Group>
                        <Form.Label>
                            Title<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {title.length == 0 && (
                            <label style={{ color: "red" }}>
                                Please enter the title
                            </label>
                        )}

                    </Form.Group>


                    <Form.Group>
                        <Form.Label>
                            Content<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                        />
                        {content.length == 0 && (
                            <label style={{ color: "red" }}>
                                Please enter the Content
                            </label>
                        )}
                    </Form.Group>


                    <br />
                    <FormGroup>
                        <Button type="submit">Submit</Button>
                    </FormGroup>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Link to={"/report"}>Back to List</Link>
            </Card.Footer>
        </Card>
    );
};
export default CreateReport;
