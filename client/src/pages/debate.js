import React, { useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import "../App.css";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

// Components
import Opponent from "../components/opponent";

// Images
import QuestionMark from "../images/question_mark.png";
import OpenaiLogo from "../images/openai_logo.png";
import UserImage from "../images/user.jpg";
import Typing from "../images/typing.gif";

export default function Debate() {
    const [showDebate, setShowDebate] = React.useState(false);
    const [showEndDebate, setShowEndDebate] = React.useState(false);

    // State variables for opponent and opponent image
    const [positiveOpponent, setPositiveOpponent] = React.useState("Select Opponent");
    const [negativeOpponent, setNegativeOpponent] = React.useState("Select Opponent");
    const [positiveImage, setPositiveImage] = React.useState(QuestionMark);
    const [negativeImage, setNegativeImage] = React.useState(QuestionMark);

    // State variable for turn indicator (true = positive, false = negative)
    const [isPositiveTurn, setIsPositiveTurn] = React.useState(true);

    const [round, setRound] = React.useState(1);

    const [waitingPositiveArgument, setWaitingPositiveArgument] = React.useState(false);
    const [waitingNegativeArgument, setWaitingNegativeArgument] = React.useState(false);

    // State variables for arguments
    const [positiveArguments, setPositiveArguments] = React.useState([]);
    const [negativeArguments, setNegativeArguments] = React.useState([]);

    // State variables for user argument
    const [positiveUserArgument, setPositiveUserArgument] = React.useState("");
    const [negativeUserArgument, setNegativeUserArgument] = React.useState("");

    // State variables for disabling user argument buttons
    const [positiveUserArgumentDisabled, setPositiveUserArgumentButtonDisabled] = React.useState(true);
    const [negativeUserArgumentButtonDisabled, setNegativeUserArgumentButtonDisabled] = React.useState(true);

    // State variables for topic
    const [topic, setTopic] = React.useState("");

    // State variable for disabling opponent button
    const [disableOpponentButton, setDisableOpponentButton] = React.useState(true);

    // State variable for disabling topic button
    const [disableTopicButton, setDisableTopicButton] = React.useState(true);

    // State variables for modals
    const [showOpponentModal, setShowOpponentModal] = React.useState(true);
    const [showTopicModal, setShowTopicModal] = React.useState(false);

    // Function to handle opponent selection from dropdown menu
    useEffect(() => {
        if (positiveOpponent !== "Select Opponent" && negativeOpponent !== "Select Opponent") {
            setDisableOpponentButton(false);
        }

        window.scrollTo(0, document.body.scrollHeight);
    }, [positiveOpponent, negativeOpponent, positiveArguments, negativeArguments]);

    const initializePositive = async () => {
        if (positiveOpponent === "Chat-GPT") {
            setWaitingPositiveArgument(true);

            try {
                const response = await fetch("/argument-gpt", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: topic,
                        opponent: "positive",
                    }),
                });

                let argument = await response.json();

                setWaitingPositiveArgument(false);
                setIsPositiveTurn(false);

                setPositiveArguments([...positiveArguments, argument]);

                window.scrollTo(0, document.body.scrollHeight);
            } catch (error) {
                console.log(error);
            }
        } else {
            setIsPositiveTurn(true);
        }
    };

    const handlePositiveSelect = (data) => {
        if (data === "chat-gpt") {
            setPositiveImage(OpenaiLogo);
            setPositiveOpponent("Chat-GPT");
        } else if (data === "user") {
            setPositiveImage(UserImage);
            setPositiveOpponent("User");
        }
    };

    const handleNegativeSelect = (data) => {
        if (data === "chat-gpt") {
            setNegativeImage(OpenaiLogo);
            setNegativeOpponent("Chat-GPT");
        } else if (data === "user") {
            setNegativeImage(UserImage);
            setNegativeOpponent("User");
        }
    };

    const handleOpponentNext = () => {
        setShowOpponentModal(false);
        setShowTopicModal(true);
    };

    const handleTopicChange = (event) => {
        setTopic(event.target.value);

        if (event.target.value !== "") {
            setDisableTopicButton(false);
        } else {
            setDisableTopicButton(true);
        }
    };

    const handleTopicNext = () => {
        setShowTopicModal(false);
        setShowDebate(true);
    };

    const handlePositiveUserArgumentChange = (event) => {
        const newValue = event.target.value;

        if (newValue.length <= 100) {
            setPositiveUserArgument(event.target.value);
        }

        if (newValue.length > 0) {
            setPositiveUserArgumentButtonDisabled(false);
        } else {
            setPositiveUserArgumentButtonDisabled(true);
        }
    };

    const handleNegativeUserArgumentChange = (event) => {
        const newValue = event.target.value;

        if (newValue.length <= 100) {
            setNegativeUserArgument(event.target.value);
        }

        if (newValue.length > 0) {
            setNegativeUserArgumentButtonDisabled(false);
        } else {
            setNegativeUserArgumentButtonDisabled(true);
        }
    };

    const handlePositiveArgument = async (event) => {
        event.preventDefault();

        let endpoint = "";
        let prompt = "";

        if (positiveOpponent === "Chat-GPT") {
            endpoint = "/argument-gpt";
            prompt = negativeArguments[negativeArguments.length - 1].argument;
        } else {
            endpoint = "/argument-user";
            prompt = positiveUserArgument;
        }

        setWaitingPositiveArgument(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    opponent: "positive",
                    topic: topic,
                }),
            });

            let argument = await response.json();

            setWaitingPositiveArgument(false);
            setIsPositiveTurn(false);

            setPositiveArguments([...positiveArguments, argument]);

            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.log(error);
        }
    };

    const handleNegativeArgument = async (event) => {
        event.preventDefault();

        let endpoint = "";
        let prompt = "";

        if (negativeOpponent === "Chat-GPT") {
            endpoint = "/argument-gpt";
            prompt = positiveArguments[positiveArguments.length - 1].argument;
        } else {
            endpoint = "/argument-user";
            prompt = negativeUserArgument;
        }

        setWaitingNegativeArgument(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    opponent: "negative",
                    topic: topic,
                }),
            });

            let argument = await response.json();

            setWaitingNegativeArgument(false);
            setIsPositiveTurn(true);

            setNegativeArguments([...negativeArguments, argument]);

            window.scrollTo(0, document.body.scrollHeight);
        } catch (error) {
            console.log(error);
        }

        if (round < 3) {
            setRound(round + 1);
        } else {
            setShowEndDebate(true);
        }
    };

    return (
        <Row className="justify-content-center margin-bottom-50">
            <Col xs={12} md={8} className="text-center">
                <Modal show={showOpponentModal} className="margin-top-60">
                    <Modal.Header>
                        <Modal.Title>Choose your Opponenets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col className="text-center">
                                <Opponent name="Positive" image={positiveImage} />
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={positiveOpponent}
                                    onSelect={handlePositiveSelect}
                                    variant="primary"
                                    className="margin-top-15"
                                >
                                    <Dropdown.Item eventKey="chat-gpt">Chat-GPT</Dropdown.Item>
                                    <Dropdown.Item eventKey="user">User</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col className="text-center">
                                <Opponent name="Negative" image={negativeImage} />
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={negativeOpponent}
                                    onSelect={handleNegativeSelect}
                                    variant="primary"
                                    className="margin-top-15"
                                >
                                    <Dropdown.Item eventKey="chat-gpt">Chat-GPT</Dropdown.Item>
                                    <Dropdown.Item eventKey="user">User</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" disabled={disableOpponentButton} onClick={handleOpponentNext}>
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showTopicModal} className="margin-top-60">
                    <Modal.Header>
                        <Modal.Title>Choose your Topic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl type="text" placeholder="Enter Topic" onChange={handleTopicChange} />
                        <h6 className="margin-top-15">Here are a few examples to copy and paste:</h6>
                        <ul>
                            <li>Is climate change a real and pressing issue that requires immediate action?</li>
                            <li>Should Seattle, WA make public transportation free?</li>
                            <li>Should the US have a national healthcare system?</li>
                            <li>Should the government provide universal basic income for all citizens?</li>
                            <li>Is social media more harmful or beneficial for society?</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            disabled={disableTopicButton}
                            onClick={() => {
                                handleTopicNext();
                                initializePositive();
                            }}
                        >
                            Begin Debate!
                        </Button>
                    </Modal.Footer>
                </Modal>

                {showDebate ? (
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
                                    <Opponent name="Positive" image={positiveImage} />
                                    {positiveArguments.map((argument, index) => (
                                        <Row>
                                            <Col className="text-center">
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key={index}
                                                    placement="left"
                                                    overlay={
                                                        <Popover id={index}>
                                                            <Popover.Header as="h3">
                                                                {argument.argument_technique_name}
                                                            </Popover.Header>
                                                            <Popover.Body>
                                                                {argument.argument_technique_explanation}
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <Button variant="info" className="margin-top-30">
                                                        {argument.argument}
                                                    </Button>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    ))}
                                    {waitingPositiveArgument && (
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="margin-top-15"
                                        />
                                    )}

                                    {isPositiveTurn &&
                                        !waitingPositiveArgument &&
                                        !showEndDebate &&
                                        positiveOpponent === "Chat-GPT" && (
                                            <Button
                                                variant="primary"
                                                onClick={handlePositiveArgument}
                                                className="margin-top-15"
                                            >
                                                Respond
                                            </Button>
                                        )}

                                    {isPositiveTurn &&
                                        !waitingPositiveArgument &&
                                        !showEndDebate &&
                                        positiveOpponent === "User" && (
                                            <Form onSubmit={handlePositiveArgument} className="margin-top-15">
                                                <Form.Group>
                                                    <Form.Control
                                                        as="textarea"
                                                        maxLength={300}
                                                        type="text"
                                                        placeholder="Enter argument"
                                                        onChange={handlePositiveUserArgumentChange}
                                                    />
                                                    <Form.Text>{`${positiveUserArgument.length}/300 characters`}</Form.Text>
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    disabled={positiveUserArgumentDisabled}
                                                    type="submit"
                                                    className="margin-top-15"
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        )}
                                </Col>
                                <Col className="text-center">
                                    <Opponent name="Negative" image={negativeImage} />
                                    {negativeArguments.map((argument, index) => (
                                        <Row>
                                            <Col className="text-center">
                                                <OverlayTrigger
                                                    trigger="click"
                                                    key={index}
                                                    placement="right"
                                                    overlay={
                                                        <Popover id={index}>
                                                            <Popover.Header as="h3">
                                                                {argument.argument_technique_name}
                                                            </Popover.Header>
                                                            <Popover.Body>
                                                                {argument.argument_technique_explanation}
                                                            </Popover.Body>
                                                        </Popover>
                                                    }
                                                >
                                                    <Button variant="warning" className="margin-top-30">
                                                        {argument.argument}
                                                    </Button>
                                                </OverlayTrigger>
                                            </Col>
                                        </Row>
                                    ))}
                                    {waitingNegativeArgument && (
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            className="margin-top-15"
                                        />
                                    )}

                                    {!isPositiveTurn &&
                                        !waitingNegativeArgument &&
                                        !showEndDebate &&
                                        negativeOpponent === "Chat-GPT" && (
                                            <Button
                                                variant="primary"
                                                onClick={handleNegativeArgument}
                                                className="margin-top-15"
                                            >
                                                Respond
                                            </Button>
                                        )}

                                    {!isPositiveTurn && !waitingNegativeArgument && negativeOpponent === "User" && (
                                        <Form onSubmit={handleNegativeArgument} className="margin-top-15">
                                            <Form.Group>
                                                <Form.Control
                                                    as="textarea"
                                                    maxLength={300}
                                                    type="text"
                                                    placeholder="Enter argument"
                                                    onChange={handleNegativeUserArgumentChange}
                                                />
                                                <Form.Text>{`${negativeUserArgument.length}/300 characters`}</Form.Text>
                                            </Form.Group>
                                            <Button
                                                variant="primary"
                                                disabled={negativeUserArgumentButtonDisabled}
                                                type="submit"
                                                className="margin-top-15"
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                </Col>
                            </Row>
                            {showEndDebate ? (
                                <Row>
                                    <Col className="text-center">
                                        <h1>Debate has ended!</h1>
                                    </Col>
                                </Row>
                            ) : null}
                        </Col>
                    </Row>
                ) : null}
            </Col>
        </Row>
    );
}
