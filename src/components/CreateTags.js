import { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
const CreateTags = () => {
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [topic, setTopic] = useState("");
  const [created, setCreated] = useState("");
  const [description, setDescription] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, topic, created, description };
    if (topic.length === 0 || description.length === 0) {
      alert('Please fill all fields');
    } else {


      fetch(" http://localhost:9999/tags", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...empdata, created: +new Date(created), views:0 }),

      })
        .then(() => {
          alert("Add Tags successfully.");
          navigate("/taglist");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <Card>
      <Card.Header style={{ textAlign: "center" }}>Create Tags</Card.Header>
          <Card.Body>
        <Form onSubmit={handlesubmit}>

          <Form.Group>
            <Form.Label>
              ID<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control disabled value={id} />
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Topic<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            {topic.length == 0 && (
              <label style={{ color: "red" }}>
                Please enter the topic
              </label>
            )}

          </Form.Group>

          <Form.Group>
            <Form.Label>
              Created<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
            />


          </Form.Group>
          <Form.Group>
            <Form.Label>
              Description<span style={{ color: "red" }}>*</span>
            </Form.Label>
            <Form.Control
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
            />
            {description.length == 0 && (
              <label style={{ color: "red" }}>
                Please enter the description
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
        <Link to={"/taglist"}>Back to List</Link>
      </Card.Footer>
    </Card>
  );
};
export default CreateTags;
