import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Router is needed for Link to work
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Home() {
    return (
        <Row>
            <Col>
                <h1>Debater-GPT</h1>
                <p>
                    Debater-GPT is a web application that uses GPT-3 to debate
                    with you. It is a work in progress.
                </p>
                <Button variant="primary" as={Link} to="/debate">
                    Play Debate-GPT
                </Button>
            </Col>
        </Row>
    );
}
