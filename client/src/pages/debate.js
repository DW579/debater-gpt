import React, { useEffect } from "react";
import { FormControl } from "react-bootstrap";

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

    // State variables for opponent and opponent image
    const [positiveOpponent, setPositiveOpponent] =
        React.useState("Select Opponent");
    const [negativeOpponent, setNegativeOpponent] =
        React.useState("Select Opponent");
    const [positiveImage, setPositiveImage] = React.useState(QuestionMark);
    const [negativeImage, setNegativeImage] = React.useState(QuestionMark);

    const [positiveArguments, setPositiveArguments] = React.useState([]);
    const [negativeArguments, setNegativeArguments] = React.useState([]);

    // State variables for topic
    const [topic, setTopic] = React.useState("");

    // State variable for disabling opponent button
    const [disableOpponentButton, setDisableOpponentButton] =
        React.useState(true);

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
        let endpoint = "";

        if(positiveOpponent === "Chat-GPT") {
            endpoint = "/argument-positive";
        } else if (positiveOpponent === "User") {
            endpoint = "/argument-user";
        }

		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({prompt: "You are a debater in a debate competition."})
			});

			const argument = await response.json();

			setPositiveArguments([...positiveArguments, argument]);
		} catch(error) {

			console.log(error);
		}
	};

    const initializeNegative = async () => {
        let endpoint = "";

        if(negativeOpponent === "Chat-GPT") {
            endpoint = "/argument-negative";
        } else if (negativeOpponent === "User") {
            endpoint = "/argument-user";
        }
        
		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({prompt: "You are a debater in a debate competition."})
			});

			const argument = await response.json();

            setNegativeArguments([...negativeArguments, argument]);
		} catch(error) {

			console.log(error);
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
                                initializeNegative();
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
                                    <Image src={Typing} alt="Typing" />
                                    <FormControl
                                        type="text"
                                        placeholder="Enter argument"
                                        onChange={handleTopicChange}
                                    />
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
                                    <Image src={Typing} alt="Typing" />
                                    <FormControl
                                        type="text"
                                        placeholder="Enter argument"
                                        onChange={handleTopicChange}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                ) : null}
            </Col>
        </Row>
    );
}
