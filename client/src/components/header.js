import React from "react";

// Router is needed for Link to work
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Header() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Debater-GPT
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/debate">
                        Debate
                    </Nav.Link>
                    <Nav.Link as={Link} to="/about">
                        About
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
