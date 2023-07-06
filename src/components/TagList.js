import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Table } from "react-bootstrap";
import Badge from 'react-bootstrap/Badge';
import DefaultLayout from "../layouts/DefaultLayout";

const TagList = () => {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("http://localhost:9999/tags")
      .then((resp) => resp.json())
      .then((data) => {
        setTags(data);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Do you want to remove product - ID: " + id + "?")) {
      fetch("http://localhost:9999/tags/" + id, {
        method: "DELETE",
      })
        .then(() => {
          alert("Delete success");
          // window.location.reload();  thêm cái này sẽ reload lại về create
          navigate('/tag')
        })
        .catch((err) => {
          console.log(err.message);
        });

    }

  };

  return (
    <DefaultLayout>

   
    <Container>
      <div>
        <h2 style={{ color: "black", textAlign: "center" }}>List of tags</h2>

        <Link to={"/tag/create"} ><Button variant="primary" style={{ marginLeft: "90%" }}>New Tag</Button></Link>

        <div className="tag-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Row className="tag-row">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Topic</th>
                  <th>Created</th>
                  <th>Description</th>
                  <th>Views</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {tags.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    {/* <td><Link to={"/taglistdetail/" + t.id} >{t.topic}</Link></td> */}
                    <td style={{ color: 'white' }}>
                      <Badge bg="secondary">{t.topic}</Badge>
                    </td>
                    <td>{new Date(t.created).toLocaleDateString("en-US")}</td>
                    <td>{t.description}</td>
                    <td>{t.views}</td>
                    <td><Link to={"/"} onClick={() => handleDelete(t.id)}>Delete</Link>
                    </td>
                    <td><Link to={'/edit/' + t.id}>Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
    </Container>
    </DefaultLayout>
  );
};
export default TagList;
