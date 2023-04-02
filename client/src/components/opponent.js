import React from "react";

// Bootstrap components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

// Images
import QuestionMark from "../images/question_mark.png";
import OpenaiLogo from "../images/openai_logo.png";
import UserImage from "../images/user.jpg";

export default function Opponent(props) {
    // State variables for opponent and opponent image
    const [opponent, setOpponent] = React.useState("");
    const [opponentImage, setOpponentImage] = React.useState(QuestionMark);

    const image_style = {
        width: "150px",
        height: "150px",
    };

    // Function to handle opponent selection from dropdown menu
    const handleSelect = (eventKey) => {
        let opponent = "";

        // Set opponent based on eventKey value (1 or 2) and update state with setOpponent function
        if (eventKey === "1") {
            setOpponent("Chat-GPT 3");
            setOpponentImage(OpenaiLogo);

            opponent = "Chat-GPT 3";
        } else if (eventKey === "2") {
            setOpponent("Human");
            setOpponentImage(UserImage);

            opponent = "Human";
        }

        // Call the onData function passed in as a prop from Debate.js
        props.onData(opponent);
    };

    return (
        <Row>
            <Col>
                <h3>{props.name}</h3>
                <img src={opponentImage} style={image_style} alt="Opponent" />
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={props.dropdown}>
                        {opponent ? opponent : "Select Opponent"}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="1">Chat-GPT 3</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Human</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
}
