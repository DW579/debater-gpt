import React from "react";
import "../App.css";

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function Opponents() {
    const [OpponentData, setOpponentData] = React.useState({
        positiveOpponent: null,
        negativeOpponent: null
    });

    return (
        <Row>
            <Col md={{ span: 6, offset: 3 }} className="text-center centered">
                <h1>Opponents</h1>
                <p>
                    This is the opponents page.
                </p>
                <Button variant="primary" as={Link} to={{pathname: '/topic'}} state={{ opponentData: OpponentData }} className="margin-top-15">
                    Pass data to topic
                </Button>
            </Col>
        </Row>
    );
}



