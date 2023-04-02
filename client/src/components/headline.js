import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Headline(props) {
    return (
        <Row>
            <Col>
                <h1>{props.name}</h1>
            </Col>
        </Row>
    );
}
