import React, { useEffect } from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import Headline from "../components/headline";
import Opponent from "../components/opponent";
import Topic from "../components/topic";
import Button from "react-bootstrap/esm/Button";

export default function Debate() {
    // State variables for positive and negative opponents and dropdown state variables for each opponent (true or false)
    const [positive, setPositive] = React.useState("");
    const [negative, setNegative] = React.useState("");
    const [opponentDropdown, setOpponentDropdown] = React.useState(false);

    // State variable for disabled button
    const [disabled, setDisabled] = React.useState(true);

    const [showTopic, setShowTopic] = React.useState(false);

    // useEffect hook to check if both opponents have been selected and update disabled state accordingly
    useEffect(() => {
        if (positive && negative) {
            setDisabled(false);
        }
    }, [positive, negative]);

    // Functions to handle positive and negative opponent selection
    const handlePositiveSelect = (data) => {
        setPositive(data);
    };

    const handleNegativeSelect = (data) => {
        setNegative(data);
    };

    // Function to handle topic button click
    const handleChooseTopicClick = () => {
        setOpponentDropdown(true);
        setShowTopic(true);
    };

    return (
        <Row className="justify-content-center">
            <Col xs={12} md={6} className="text-center">
                <Headline name="Debate!" />
                <Row>
                    <Col>
                        <Opponent
                            name="Positive"
                            onData={handlePositiveSelect}
                            dropdown={opponentDropdown}
                        />
                    </Col>
                    <Col>
                        <Opponent
                            name="Negative"
                            onData={handleNegativeSelect}
                            dropdown={opponentDropdown}
                        />
                    </Col>
                </Row>
                {showTopic ? (
                    <Topic />
                ) : (
                    <Row>
                        <Col>
                            <Button
                                variant="success"
                                size="lg"
                                disabled={disabled}
                                onClick={handleChooseTopicClick}
                            >
                                Choose Topic
                            </Button>
                        </Col>
                    </Row>
                )}
            </Col>
        </Row>
    );
}
