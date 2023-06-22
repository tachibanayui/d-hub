import { Col, Container, Row } from "react-bootstrap";

export default function Footer() {
    return (
        <footer style={{ background: "black", color: "white" }} className="p-2 fixed-bottom">
            <Container>
                <p className="text-center">Designed by DHub Team</p>
            </Container>
        </footer>
    );
}
