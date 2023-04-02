import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
                            name="Opponent 1"
                            image="https://via.placeholder.com/150"
                        />
                    </Col>
                    <Col>
                        <Opponent
                            name="Opponent 2"
                            image="https://via.placeholder.com/150"
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
