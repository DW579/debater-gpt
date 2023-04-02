import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

export default function Topic(props) {
    return (
        <Row>
            <Col>
                <h3>Choose Topic</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Topic
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">Should Seattle, WA make public transportation free?</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Topic 2</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Choose your own</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
}
