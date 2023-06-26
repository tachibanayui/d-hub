import { Card, Col, Container, Row } from "react-bootstrap";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function Register() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const nav = useNavigate();

    const handleLogin = () => {
        if (user && password && fname && address && city&& phone  && email&& gender) {
            alert("Register Successfull");
            nav('/login');
        }
    }
    return (

        <Container class="container">
            <Row className="vh-100 d-flex justify-content-center align-items-center">
                <Col md={8} lg={6} xs={12}>
                    <div className="border border-3 border-primary"></div>
                    <Card className="shadow">

                        <Card.Header style={{ background: "#eee" }}>
                            <Card.Title>User Registration</Card.Title>
                        </Card.Header>

                        <Card.Body>

                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupUsername"
                                        >
                                            <Form.Label>
                                                Username
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setUser(e.target.value)} />

                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{user ? "" : "Please enter username"}</p>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupPassword"
                                        >
                                            <Form.Label>
                                                Password
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />

                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{password ? "" : "Please enter password"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupFullName"
                                        >
                                            <Form.Label>
                                                Fullname
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setFname(e.target.value)} />
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{fname ? "" : "Please enter Fullname"}</p>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupEmail"
                                        >
                                            <Form.Label for="staticEmail">
                                                Email
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></Form.Control> 
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{fname ? "" : "Please enter Fullname"}</p>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupPhone"
                                        >
                                            <Form.Label>
                                                Phone
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setPhone(e.target.value)} />
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{phone ? "" : "Please enter NumberPhone"}</p>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupCountry"
                                        >
                                            <Form.Label>
                                                City
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Control type="text" onChange={(e) => setCity(e.target.value)} />
                                      
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{city ? "" : "Please choose City"}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupAddress"
                                        >
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control type="text" onChange={(e) => setAddress(e.target.value)} />
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{address ? "" : "Please enter Address"}</p>
                                    </Col>
                                    <Col>
                                        <Form.Group
                                            className="mb-3"
                                            controlId="formGroupCountry"
                                        >
                                            <Form.Label>
                                                Gender
                                                <span style={{ color: "red" }}>
                                                    *
                                                </span>
                                            </Form.Label>
                                            <Form.Select required  onChange={(e) => setGender(e.target.value)}>
                                                <option value="0">
                                                    ---Choose---
                                                </option>
                                                <option value="0">Nam</option>
                                                <option value="1">Nữ</option>
                                               
                                            </Form.Select>
                                        </Form.Group>
                                        <p style={{ color: 'red' }}>{gender ? "" : "Please choose gender:"}</p>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>

                        <Card.Footer
                            style={{
                                background: "#eee",
                                justifyContent: "flex-start",
                            }}
                        >
                            <Button onClick={handleLogin}>
                          Register
                        </Button>
                            <Link to="/">
                                <Button
                                    style={{ background: "red" }}
                                    variant="primary"
                                >
                                    Back
                                </Button>
                            </Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>



    );
}