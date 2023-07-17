import React, { useEffect } from "react";
import "../App.css";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';

// Images
import QuestionMark from "../images/question_mark.png";
import OpenaiLogo from "../images/openai_logo.png";
import UserImage from "../images/user.jpg";

export default function Opponent(props) {
    // State variable for opponent image
    const [opponent, setOpponent] = React.useState({
        image: QuestionMark,
    });

    // Effect hook to set opponent image
    useEffect(() => {
        if (props.opponent === "chat-gpt") {
            setOpponent((prevState) => ({
                ...prevState,
                image: OpenaiLogo,
            }));
        }

        if (props.opponent === "user") {
            setOpponent((prevState) => ({
                ...prevState,
                image: UserImage,
            }));
        }
    }, [props]);

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Header as="h3">{props.name}</Card.Header>
                    <Card.Img variant="top" src={opponent.image} />
                </Card>
            </Col>
        </Row>
    );
}
