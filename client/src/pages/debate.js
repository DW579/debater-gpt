import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../App.css";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

export default function Debate() {
    const REACT_APP_IMAGE_KIT_ENDPOINT = process.env.REACT_APP_IMAGE_KIT_ENDPOINT;

    const location = useLocation();

    const data = location.state;

    const topic = data.topic;

    const [turn, setTurn] = React.useState("affirmative");

    const [rebuttals, setRebuttals] = React.useState([]);

    const affirmativeOpponent = data.opponents.affirmative;
    const opposingOpponent = data.opponents.opposing;

    const [waiting, setWaiting] = React.useState(false);

    const [startDebate, setStartDebate] = React.useState(false);

    const [showEndDebate, setShowEndDebate] = React.useState(false);

    const [round, setRound] = React.useState(1);

    const [userRebuttal, setUserRebuttal] = React.useState("");

    const [userButton, setUserButton] = React.useState(false);

    // Function to handle opponent selection from dropdown menu
    useEffect(() => {
        if (round > 3) {
            setShowEndDebate(true);
        }
        window.scrollTo(0, document.body.scrollHeight);
    }, [rebuttals, round]);

    const handleUserRebuttalChange = (event) => {
        const newValue = event.target.value;

        if (newValue.length <= 100) {
            setUserRebuttal(event.target.value);
        }

        if (newValue.length > 0) {
            setUserButton(false);
        } else {
            setUserButton(true);
        }
    };

    const handleRebuttal = async (event) => {
        event.preventDefault();

        setWaiting(true);

        // Handle rebuttal
        // data.opponents[turn]
        try {
            const response = await fetch("/chat-gpt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic: topic,
                    rebuttals: rebuttals,
                    turn: turn,
                    opponent: data.opponents[turn],
                    userRebuttal: userRebuttal
                }),
            });

            let rebuttal = await response.json();

            // {"opponent": "", "content": "", "technique": "", "explanation": ""}
            setRebuttals([...rebuttals, rebuttal]);

            // Increment round if turn is opposing
            if (turn === "opposing") {
                setRound(round + 1);
            }

            // setTurn for next opponent
            setTurn(turn === "affirmative" ? "opposing" : "affirmative");

            setWaiting(false);

            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStartDebate = (event) => {
        event.preventDefault();

        setStartDebate(true);

        if(affirmativeOpponent === "chat-gpt") {
            handleRebuttal(event);
        }

    };

    return (
        <Row className="justify-content-center margin-bottom-50">
            <Col
                xs={12}
                md={8}
                className="text-center"
            >
                <Row>
                    <Col className="text-center">
                        <Card className="text-center margin-top-30">
                            <Card.Header>Topic</Card.Header>
                            <Card.Body>
                                <Card.Title>{topic}</Card.Title>
                            </Card.Body>
                        </Card>
                        <Row className="margin-top-40">
                            <Col className="text-center">
                                <h3 className="margin-top-15">Affirmative</h3>
                                <img
                                    src={REACT_APP_IMAGE_KIT_ENDPOINT + data.opponents.affirmative}
                                    alt={data.opponents.affirmative}
                                    className="image-style"
                                />
                            </Col>
                            <Col className="text-center">
                                <h3 className="margin-top-15">Opposing</h3>
                                <img
                                    src={REACT_APP_IMAGE_KIT_ENDPOINT + data.opponents.opposing}
                                    alt={data.opponents.opposing}
                                    className="image-style"
                                />
                            </Col>
                        </Row>
                        {!startDebate ? (
                            <Row className="margin-top-40">
                                <Col>
                                    <Button
                                        variant="success"
                                        onClick={handleStartDebate}
                                    >
                                        Start Debate
                                    </Button>
                                </Col>
                            </Row>
                        ) : (
                            <Row className="margin-top-40">
                                <Col className="text-center">
                                    {/* Rebuttals */}
                                    {rebuttals.map(
                                        (rebuttal, index) =>
                                            rebuttal.opponent === "affirmative" && (
                                                <Row key={index}>
                                                    <Col className="text-center">
                                                        <OverlayTrigger
                                                            trigger="click"
                                                            key={index}
                                                            placement="left"
                                                            overlay={
                                                                <Popover id={index}>
                                                                    <Popover.Header as="h3">{rebuttal.technique}</Popover.Header>
                                                                    <Popover.Body>{rebuttal.explanation}</Popover.Body>
                                                                </Popover>
                                                            }
                                                        >
                                                            <Button
                                                                variant="info"
                                                                className="margin-top-30"
                                                            >
                                                                {rebuttal.content}
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </Col>
                                                </Row>
                                            )
                                    )}

                                    {/* Spinner */}
                                    {turn === "affirmative" && waiting && !showEndDebate && (
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="margin-top-15"
                                        />
                                    )}

                                    {/* GPT Button */}
                                    {turn === "affirmative" && affirmativeOpponent === "chat-gpt" && !waiting && !showEndDebate && (
                                        <Row>
                                            <Col className="text-center">
                                                <Button
                                                    variant="primary"
                                                    onClick={handleRebuttal}
                                                    className="margin-top-15"
                                                >
                                                    Respond
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}

                                    {/* User form & button */}
                                    {turn === "affirmative" && affirmativeOpponent === "user" && !waiting && !showEndDebate && (
                                        <Form
                                            onSubmit={handleRebuttal}
                                            className="margin-top-15"
                                        >
                                            <Form.Group>
                                                <Form.Control
                                                    as="textarea"
                                                    maxLength={300}
                                                    type="text"
                                                    placeholder="Enter argument"
                                                    onChange={handleUserRebuttalChange}
                                                />
                                                <Form.Text>{`${userRebuttal.length}/300 characters`}</Form.Text>
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                disabled={userButton}
                                                type="submit"
                                                className="margin-top-15"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                </Col>
                                <Col className="text-center">
                                    {/* Rebuttals */}
                                    {rebuttals.map(
                                        (rebuttal, index) =>
                                            rebuttal.opponent === "opposing" && (
                                                <Row key={index}>
                                                    <Col className="text-center">
                                                        <OverlayTrigger
                                                            trigger="click"
                                                            key={index}
                                                            placement="right"
                                                            overlay={
                                                                <Popover id={index}>
                                                                    <Popover.Header as="h3">{rebuttal.technique}</Popover.Header>
                                                                    <Popover.Body>{rebuttal.explanation}</Popover.Body>
                                                                </Popover>
                                                            }
                                                        >
                                                            <Button
                                                                variant="warning"
                                                                className="margin-top-30"
                                                            >
                                                                {rebuttal.content}
                                                            </Button>
                                                        </OverlayTrigger>
                                                    </Col>
                                                </Row>
                                            )
                                    )}

                                    {/* Spinner */}
                                    {turn === "opposing" && waiting && !showEndDebate && (
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="margin-top-15"
                                        />
                                    )}

                                    {/* GPT Button */}
                                    {turn === "opposing" && opposingOpponent === "chat-gpt" && !waiting && !showEndDebate && (
                                        <Row>
                                            <Col className="text-center">
                                                <Button
                                                    variant="primary"
                                                    onClick={handleRebuttal}
                                                    className="margin-top-15"
                                                >
                                                    Respond
                                                </Button>
                                            </Col>
                                        </Row>
                                    )}

                                    {/* User form & button */}
                                    {turn === "opposing" && opposingOpponent === "user" && !waiting && !showEndDebate && (
                                        <Form
                                            onSubmit={handleRebuttal}
                                            className="margin-top-15"
                                        >
                                            <Form.Group>
                                                <Form.Control
                                                    as="textarea"
                                                    maxLength={300}
                                                    type="text"
                                                    placeholder="Enter argument"
                                                    onChange={handleUserRebuttalChange}
                                                />
                                                <Form.Text>{`${userRebuttal.length}/300 characters`}</Form.Text>
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                disabled={userButton}
                                                type="submit"
                                                className="margin-top-15"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                </Col>
                            </Row>
                        )}
                        {showEndDebate ? (
                            <Row>
                                <Col className="text-center">
                                    <h1>Debate has ended!</h1>
                                </Col>
                            </Row>
                        ) : null}
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
