import React from "react";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Topic() {
    const location = useLocation();
    const [topic, setTopic] = React.useState({
        topic: null
    });
    
    console.log("location.state: ", location.state);
    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="text-center centered">
                <h1>Topic</h1>
                <p>
                    This is the topic page.
                </p>
                <Button variant="primary" as={Link} to={{pathname: '/debate'}} state={{ opponents: location.state.opponents, topic: topic }} className="margin-top-15">
                    Pass data to topic
                </Button>
            </Col>
        </Row>
    );
}