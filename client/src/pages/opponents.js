import React, { useEffect } from "react";

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Opponents() {
    // State variable for opponents
    const [opponents, setOpponents] = React.useState({
        affirmative: null,
        opposing: null,
    });

    // State variable for disabling button
    const [disable, setDisable] = React.useState(true);

    // Function to handle opponent selection from dropdown menu
    const handleOpponentSelect = (opponentType, data) => {
        const opponent = data.target.dataset.data;

        if (opponent === "affirmative") {
            setOpponents((prevState) => ({
                ...prevState,
                affirmative: opponentType,
            }));
        }

        if (opponent === "opposing") {
            setOpponents((prevState) => ({
                ...prevState,
                opposing: opponentType,
            }));
        }
    };

    // Effect hook to enable button when both opponents are selected
    useEffect(() => {
        if (opponents.affirmative !== null && opponents.opposing !== null) {
            setDisable(false);
        }
    }, [opponents]);

    const REACT_APP_IMAGE_KIT_ENDPOINT = "https://ik.imagekit.io/c2lziyvdx/NoDelete/";

    return (
        <Row className="justify-content-center">
            <Col
                xs={12}
                md={8}
                className="text-center"
            >
                <Row>
                    <Col>
                        <h1>Select Opponents</h1>
                    </Col>
                </Row>
                <Row className="margin-top-30">
                    <Col className="text-center">
                        <Card>
                            <Card.Header as="h3">Affirmative</Card.Header>
                            <Card.Img variant="top" src={opponents.affirmative ? REACT_APP_IMAGE_KIT_ENDPOINT + opponents.affirmative : REACT_APP_IMAGE_KIT_ENDPOINT + "question-mark"} />
                        </Card>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={opponents.affirmative ? opponents.affirmative : "Select Opponent"}
                            onSelect={handleOpponentSelect}
                            variant="primary"
                            className="margin-top-15"
                        >
                            <Dropdown.Item
                                eventKey="chat-gpt"
                                data-data="affirmative"
                            >
                                Chat-GPT
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="user"
                                data-data="affirmative"
                            >
                                User
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col className="text-center">
                        <Card>
                            <Card.Header as="h3">Opposing</Card.Header>
                            <Card.Img variant="top" src={opponents.opposing ? REACT_APP_IMAGE_KIT_ENDPOINT + opponents.opposing : REACT_APP_IMAGE_KIT_ENDPOINT + "question-mark"} />
                        </Card>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={opponents.opposing ? opponents.opposing : "Select Opponent"}
                            onSelect={handleOpponentSelect}
                            variant="primary"
                            className="margin-top-15"
                        >
                            <Dropdown.Item
                                eventKey="chat-gpt"
                                data-data="opposing"
                            >
                                Chat-GPT
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="user"
                                data-data="opposing"
                            >
                                User
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {disable ? (
                            <Button
                                variant="primary"
                                disabled={true}
                                className="margin-top-15"
                            >
                                Pick Topic
                            </Button>
                        ) : (
                            <Button
                                variant="primary"
                                as={Link}
                                to={{ pathname: "/topic" }}
                                state={{ opponents: opponents }}
                                className="margin-top-15"
                            >
                                Pick Topic
                            </Button>
                        )}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
