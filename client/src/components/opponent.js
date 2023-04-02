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
    const [opponent, setOpponent] = React.useState(null);
    const [opponentImage, setOpponentImage] = React.useState(QuestionMark);

    const image_style = {
        width: "150px",
        height: "150px",
    };

    // Function to handle opponent selection from dropdown menu (see line 35)
    const handleSelect = (eventKey) => {
        // Set opponent based on eventKey value (1 or 2) and update state with setOpponent function (see line 10)
        if (eventKey === "1") {
            setOpponent("Chat-GPT 3");
            setOpponentImage(OpenaiLogo);
        } else if (eventKey === "2") {
            setOpponent("Human");
            setOpponentImage(UserImage);
        }
    };

    return (
        <Row>
            <Col>
                <h3>{props.name}</h3>
                <img src={opponentImage} style={image_style} />
                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
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
