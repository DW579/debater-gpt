import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

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
            <Col md={{ span: 6, offset: 3 }} className="text-center centered">
                <h1>Welcome to Debater-GPT</h1>
                <p>
                    Debater-GPT is a web application that engages you in a debate using GPT-3 technology. The idea for
                    this application was inspired by IBM Watson's Project Debater. With this application, you can choose
                    to watch a debate between OpenAI's Chat-GPT 3, or you can participate in a debate against Chat-GPT 3
                    or another user. Chat-GPT 3 will analyze each argument and provide feedback on the debate techniques
                    used. To view the feedback, simply click on the argument.
                </p>
                <Button variant="primary" as={Link} to="/debate" className="margin-top-15">
                    Play Debater-GPT
                </Button>
            </Col>
        </Row>
    );
}
