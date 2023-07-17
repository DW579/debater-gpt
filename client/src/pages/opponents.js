import React, { useEffect } from "react";

// eslint-disable-next-line
import { BrowserRouter as Router, Link } from "react-router-dom";

// Components
import Opponent from "../components/opponent";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function Opponents() {
    // State variable for opponents
    const [opponents, setOpponents] = React.useState({
        positive: null,
        negative: null,
    });

    // State variable for disabling button
    const [disable, setDisable] = React.useState(true);

    // Function to handle opponent selection from dropdown menu
    const handleOpponentSelect = (opponentType, data) => {
        const opponent = data.target.dataset.data;

        if (opponent === "positive") {
            setOpponents((prevState) => ({
                ...prevState,
                positive: opponentType,
            }));
        }

        if (opponent === "negative") {
            setOpponents((prevState) => ({
                ...prevState,
                negative: opponentType,
            }));
        }
    };

    // Effect hook to enable button when both opponents are selected
    useEffect(() => {
        if (opponents.positive !== null && opponents.negative !== null) {
            setDisable(false);
        }
    }, [opponents]);

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
                        <Opponent
                            name="Positive"
                            opponent={opponents.positive}
                        />
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={opponents.positive ? opponents.positive : "Select Opponent"}
                            onSelect={handleOpponentSelect}
                            variant="primary"
                            className="margin-top-15"
                        >
                            <Dropdown.Item
                                eventKey="chat-gpt"
                                data-data="positive"
                            >
                                Chat-GPT
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="user"
                                data-data="positive"
                            >
                                User
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                    <Col className="text-center">
                        <Opponent
                            name="Negative"
                            opponent={opponents.negative}
                        />
                        <DropdownButton
                            id="dropdown-basic-button"
                            title={opponents.negative ? opponents.negative : "Select Opponent"}
                            onSelect={handleOpponentSelect}
                            variant="primary"
                            className="margin-top-15"
                        >
                            <Dropdown.Item
                                eventKey="chat-gpt"
                                data-data="negative"
                            >
                                Chat-GPT
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="user"
                                data-data="negative"
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
