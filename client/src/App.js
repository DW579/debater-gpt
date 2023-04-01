import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import About from "./components/about";
import Debate from "./components/debate";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function App() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Navbar bg="primary" variant="dark">
                        <Navbar.Brand href="/">Debater-GPT</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/debate">Debate</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/debate" element={<Debate />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </Router>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
