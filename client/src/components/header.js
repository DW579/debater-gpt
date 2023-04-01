import React from "react";

// Router is needed for Link to work
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function Header() {
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">
                Debater-GPT
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/debate">
                    Debate
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                    About
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
