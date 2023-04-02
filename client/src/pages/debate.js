import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

// Components
import Headline from "../components/headline";
import Opponent from "../components/opponent";

export default function Debate() {
    return (
        <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
                <Headline name="Debate!" />
                <Row>
                    <Col>
                        <Opponent
                            name="Positive"
                            image="https://via.placeholder.com/150"
                        />
                    </Col>
                    <Col>
                        <Opponent
                            name="Negative"
                            image="https://via.placeholder.com/150"
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
