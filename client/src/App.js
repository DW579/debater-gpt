import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Bootstrap components
import Container from "react-bootstrap/Container";

// Pages
import Home from "./pages/home";
import Debate from "./pages/debate";

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
                </Routes>
            </Router>
        </Container>
    );
}

export default App;
