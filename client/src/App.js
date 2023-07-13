import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";

// Pages
import Home from "./pages/home";
import Debate from "./pages/debate";
import Opponents from "./pages/opponents";
import Topic from "./pages/topic";

// Components
import Header from "./components/header";

function App() {

    return (
        <Container>
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/debate" element={<Debate />} />
                    <Route path="/opponents" element={<Opponents />} />
                    <Route path="/topic" element={<Topic />} />
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
