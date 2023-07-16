import React, { useEffect } from "react";
import "../App.css";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
                <h3>{props.name}</h3>
                <img
                    src={opponent.image}
                    className="image-style"
                    alt={props.opponent}
                />
            </Col>
        </Row>
    );
}
