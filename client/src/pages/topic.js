import React from "react";
import { useLocation } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import "../App.css";

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Topic() {
    const location = useLocation();

    // State variable for topic
    const [topic, setTopic] = React.useState({
        topic: "",
    });

    // State variable for disabling button
    const [disable, setDisable] = React.useState(true);

    // Function to handle topic change
    const handleTopicChange = (event) => {
        setTopic(event.target.value);

        if (event.target.value !== "") {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };

    return (
        <Row>
            <Col
                md={{ span: 6, offset: 3 }}
                className="text-center centered"
            >
                <h1>Topic</h1>
                <Card className="margin-top-30">
                    <Card.Header as="h5">Choose your topic</Card.Header>
                    <Card.Body>
                        <FormControl
                            type="text"
                            placeholder="Enter your topic"
                            onChange={handleTopicChange}
                        />
                        <Card.Text>
                            <strong>Here are a few examples to copy and paste:</strong>
                        </Card.Text>
                        <ul>
                            <li className="list-style">Is climate change a real and pressing issue that requires immediate action?</li>
                            <li className="list-style">Should Seattle, WA make public transportation free?</li>
                            <li className="list-style">Should the US have a national healthcare system?</li>
                            <li className="list-style">Should the government provide universal basic income for all citizens?</li>
                            <li className="list-style">Is social media more harmful or beneficial for society?</li>
                        </ul>
                        {disable ? (
                            <Button
                                variant="primary"
                                disabled={true}
                            >
                                Begin Debate
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                as={Link}
                                to={{ pathname: "/debate" }}
                                state={{ opponents: location.state.opponents, topic: topic }}
                            >
                                Begin Debate
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
