import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Opponent(props) {
    const image_style = {
        width: "150px",
        height: "150px",
    };

    return (
        <Row>
            <Col>
                <h3>{props.name}</h3>
                <img src={props.image} style={image_style} alt="Opponent" />
            </Col>
        </Row>
    );
}
