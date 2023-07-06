import { useEffect, useState } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
const Edit = () => {
  const { tid } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState(0);
  const [topic, setTopic] = useState("");
  const [created, setCreated] = useState("");
  const [description, setDescription] = useState("");
  const [views, setViews] = useState("");
  useEffect(() => {
    fetch(" http://localhost:9999/tags/" + tid)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setId(res.id);
        setTopic(res.topic);
        setCreated(res.created);
        setDescription(res.description);
        setViews(res.views);
        console.log(topic);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, topic, created, description, views };
    if (topic.length === 0 || description.length === 0 || views.length <= 0) {
      alert('Please fill all fields');
    }
    else {
      fetch(" http://localhost:9999/tags/" + tid, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(empdata),
      })
        .then(() => {
          alert("Saved successfully.");
          navigate("/taglist");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

  };
  return (
    <Card>
      <Card.Header style={{ textAlign: "center" }}>
        Edit Tags
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handlesubmit}>
          <Form.Group >
            <Form.Label>ID<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control disabled={"disabled"} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Topic<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control type="text" value={topic} onChange={(e => setTopic(e.target.value))} />
            {topic.length == 0 && (
              <label style={{ color: "red" }}>
                Please enter the topic
              </label>
            )}
          </Form.Group>
          <Form.Group >
            <Form.Label>Created<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control type="date" value={created} onChange={(e => setCreated(e.target.value))} />
          </Form.Group>
          <Form.Group >
            <Form.Label>Description<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control value={description} onChange={(e => setDescription(e.target.value))} type="text" />
            {description.length == 0 && (
              <label style={{ color: "red" }}>
                Please enter the description
              </label>
            )}
          </Form.Group>

          <Form.Group >
            <Form.Label>Views<span style={{ color: "red" }}>*</span></Form.Label>
            <Form.Control value={views} onChange={(e => setViews(e.target.value))} type="text" />
            {views.length == 0 && (
              <label style={{ color: "red" }}>
                Please enter the view
              </label>
            )}
          </Form.Group>


          <Button type="submit">Submit</Button>
        </Form>
      </Card.Body>
      <Card.Footer>
        <Link to={"/taglist"}>Back to List</Link>
      </Card.Footer>
    </Card>
  );
}
export default Edit;