import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import Headline from "../components/headline";

export default function Debate() {
    return (
        <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
                <Headline name="Debate!" />
            </Col>
        </Row>
    );
}
