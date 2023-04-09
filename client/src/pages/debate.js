import React, { useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";

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

// Components
import Headline from "../components/headline";
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
    const [positiveOpponent, setPositiveOpponent] =
        React.useState("Select Opponent");
    const [negativeOpponent, setNegativeOpponent] =
        React.useState("Select Opponent");
    const [positiveImage, setPositiveImage] = React.useState(QuestionMark);
    const [negativeImage, setNegativeImage] = React.useState(QuestionMark);

    // State variable for turn indicator (true = positive, false = negative)
    const [isPositiveTurn, setIsPositiveTurn] = React.useState(true);

    const [round, setRound] = React.useState(1);

    const [waitingPositiveArgument, setWaitingPositiveArgument] =
        React.useState(false);
    const [waitingNegativeArgument, setWaitingNegativeArgument] =
        React.useState(false);

    // State variables for arguments
    const [positiveArguments, setPositiveArguments] = React.useState([]);
    const [negativeArguments, setNegativeArguments] = React.useState([]);

    // State variables for user argument
    const [positiveUserArgument, setPositiveUserArgument] = React.useState("");
    const [negativeUserArgument, setNegativeUserArgument] = React.useState("");

    // State variables for disabling user argument buttons
    const [
        positiveUserArgumentDisabled,
        setPositiveUserArgumentButtonDisabled,
    ] = React.useState(true);
    const [
        negativeUserArgumentButtonDisabled,
        setNegativeUserArgumentButtonDisabled,
    ] = React.useState(true);

    // State variables for topic
    const [topic, setTopic] = React.useState("");

    // State variable for disabling opponent button
    const [disableOpponentButton, setDisableOpponentButton] =
        React.useState(true);

    // State variable for disabling topic button
    const [disableTopicButton, setDisableTopicButton] = React.useState(true);

    // State variables for modals
    const [showOpponentModal, setShowOpponentModal] = React.useState(true);
    const [showTopicModal, setShowTopicModal] = React.useState(false);

    // Function to handle opponent selection from dropdown menu
    useEffect(() => {
        if (
            positiveOpponent !== "Select Opponent" &&
            negativeOpponent !== "Select Opponent"
        ) {
            setDisableOpponentButton(false);
        }

        window.scrollTo(0, document.body.scrollHeight);
    }, [positiveOpponent, negativeOpponent]);

    const initializePositive = async () => {
        if (positiveOpponent === "Chat-GPT") {
            setWaitingPositiveArgument(true);

            try {
                const response = await fetch("/argument-positive", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        prompt: "You are a debater in a debate competition.",
                    }),
                });

                const argument = await response.json();

                setWaitingPositiveArgument(false);
                setIsPositiveTurn(false);

                setPositiveArguments([...positiveArguments, argument]);
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

        if (positiveOpponent === "Chat-GPT") {
            endpoint = "/argument-positive";
        } else {
            endpoint = "/argument-user";
            // console.log("User argument: " + positiveUserArgument);
        }

        setWaitingPositiveArgument(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: "This should be the argument from the negative debater",
                }),
            });

            const argument = await response.json();

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

        if (negativeOpponent === "Chat-GPT") {
            endpoint = "/argument-negative";
        } else {
            endpoint = "/argument-user";
        }

        setWaitingNegativeArgument(true);

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: "This should be the argument from the positive debater",
                }),
            });

            const argument = await response.json();

            setWaitingNegativeArgument(false);
            setIsPositiveTurn(true);

            setNegativeArguments([...negativeArguments, argument]);
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
        <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
                <Modal show={showOpponentModal}>
                    <Modal.Header>
                        <Modal.Title>Choose your Opponenets</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col className="text-center">
                                <Opponent
                                    name="Positive"
                                    image={positiveImage}
                                />
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={positiveOpponent}
                                    onSelect={handlePositiveSelect}
                                >
                                    <Dropdown.Item eventKey="chat-gpt">
                                        Chat-GPT
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="user">
                                        User
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                            <Col className="text-center">
                                <Opponent
                                    name="Negative"
                                    image={negativeImage}
                                />
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title={negativeOpponent}
                                    onSelect={handleNegativeSelect}
                                >
                                    <Dropdown.Item eventKey="chat-gpt">
                                        Chat-GPT
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="user">
                                        User
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            disabled={disableOpponentButton}
                            onClick={handleOpponentNext}
                        >
                            Next
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={showTopicModal}>
                    <Modal.Header>
                        <Modal.Title>Choose your Topic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            type="text"
                            placeholder="Enter Topic"
                            onChange={handleTopicChange}
                        />
                        <h6>Here are a few examples to copy and paste:</h6>
                        <ul>
                            <li>
                                Should Seattle, WA make public transportation
                                free?
                            </li>
                            <li>
                                Should the US have a national healthcare system?
                            </li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="primary"
                            disabled={disableTopicButton}
                            onClick={() => {
                                handleTopicNext();
                                initializePositive();
                            }}
                        >
                            Begin Debate
                        </Button>
                    </Modal.Footer>
                </Modal>

                {showDebate ? (
                    <Row>
                        <Col className="text-center">
                            <Headline name="Debate!" />
                            <h3>Topic: {topic}</h3>
                            <Row>
                                <Col className="text-center">
                                    <Opponent
                                        name="Positive"
                                        image={positiveImage}
                                    />
                                    {positiveArguments.map(
                                        (argument, index) => (
                                            <OverlayTrigger
                                                trigger="click"
                                                key={index}
                                                placement="left"
                                                overlay={
                                                    <Popover id={index}>
                                                        <Popover.Header as="h3">
                                                            {
                                                                argument.debate_technique
                                                            }
                                                        </Popover.Header>
                                                        <Popover.Body>
                                                            {
                                                                argument.debate_technique_explanation
                                                            }
                                                        </Popover.Body>
                                                    </Popover>
                                                }
                                            >
                                                <Button variant="secondary">
                                                    {argument.argument}
                                                </Button>
                                            </OverlayTrigger>
                                        )
                                    )}
                                    {waitingPositiveArgument && (
                                        <Image src={Typing} alt="Typing" />
                                    )}

                                    {isPositiveTurn && !waitingPositiveArgument && !showEndDebate && positiveOpponent === "Chat-GPT" && (
                                            <Button
                                                variant="primary"
                                                onClick={handlePositiveArgument}
                                            >
                                                Respond
                                            </Button>
                                        )}

                                    {isPositiveTurn && !waitingPositiveArgument && !showEndDebate && positiveOpponent === "User" && (
                                            <Form onSubmit={handlePositiveArgument}>
                                                <Form.Group>
                                                    <Form.Control
                                                        as="textarea"
                                                        maxLength={100}
                                                        type="text"
                                                        placeholder="Enter argument"
                                                        onChange={
                                                            handlePositiveUserArgumentChange
                                                        }
                                                    />
                                                    <Form.Text>{`${positiveUserArgument.length}/100 characters`}</Form.Text>
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    disabled={
                                                        positiveUserArgumentDisabled
                                                    }
                                                    type="submit"
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        )}
                                </Col>
                                <Col className="text-center">
                                    <Opponent
                                        name="Negative"
                                        image={negativeImage}
                                    />
                                    {negativeArguments.map(
                                        (argument, index) => (
                                            <OverlayTrigger
                                                trigger="click"
                                                key={index}
                                                placement="right"
                                                overlay={
                                                    <Popover id={index}>
                                                        <Popover.Header as="h3">
                                                            {
                                                                argument.debate_technique
                                                            }
                                                        </Popover.Header>
                                                        <Popover.Body>
                                                            {
                                                                argument.debate_technique_explanation
                                                            }
                                                        </Popover.Body>
                                                    </Popover>
                                                }
                                            >
                                                <Button variant="secondary">
                                                    {argument.argument}
                                                </Button>
                                            </OverlayTrigger>
                                        )
                                    )}
                                    {waitingNegativeArgument && (
                                        <Image src={Typing} alt="Typing" />
                                    )}

                                    {!isPositiveTurn && !waitingNegativeArgument && !showEndDebate && negativeOpponent === "Chat-GPT" && (
                                            <Button
                                                variant="primary"
                                                onClick={handleNegativeArgument}
                                            >
                                                Respond
                                            </Button>
                                        )}

                                    {!isPositiveTurn && !waitingNegativeArgument && negativeOpponent === "User" && (
                                            <Form onSubmit={handleNegativeArgument}>
                                                <Form.Group>
                                                    <Form.Control
                                                        as="textarea"
                                                        maxLength={100}
                                                        type="text"
                                                        placeholder="Enter argument"
                                                        onChange={
                                                            handleNegativeUserArgumentChange
                                                        }
                                                    />
                                                    <Form.Text>{`${negativeUserArgument.length}/100 characters`}</Form.Text>
                                                </Form.Group>
                                                <Button
                                                    variant="primary"
                                                    disabled={
                                                        negativeUserArgumentButtonDisabled
                                                    }
                                                    type="submit"
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
