import React, { useEffect } from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Components
import Headline from "../components/headline";
import Opponent from "../components/opponent";
import Button from "react-bootstrap/esm/Button";

export default function Debate() {
    // State variables for positive and negative opponents
    const [positive, setPositive] = React.useState("");
    const [negative, setNegative] = React.useState("");

    // State variable for disabled button
    const [disabled, setDisabled] = React.useState(true);

    // useEffect hook to check if both opponents have been selected and update disabled state accordingly
    useEffect(() => {
        if (positive && negative) {
            setDisabled(false);
        }
    }, [positive, negative]);

    // Functions to handle positive and negative opponent selection
    const handlePositiveSelect = (data) => {
        console.log("Positive: ", data);
        setPositive(data);
    };

    // Functions to handle positive and negative opponent selection
    const handleNegativeSelect = (data) => {
        console.log("Negative: ", data);
        setNegative(data);
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
                        />
                    </Col>
                    <Col>
                        <Opponent
                            name="Negative"
                            onData={handleNegativeSelect}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="success" size="lg" disabled={disabled}>
                            Choose Topic
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
