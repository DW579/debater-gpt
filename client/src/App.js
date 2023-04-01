import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/home";
import About from "./pages/about";
import Debate from "./pages/debate";

// Components
import Header from "./components/header";

// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";


function App() {
    // const [data, setData] = React.useState(null);

    // React.useEffect(() => {
    //     fetch("/api")
    //         .then((res) => res.json())
    //         .then((data) => setData(data.message));
    // }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/debate" element={<Debate />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </Router>
    );
}

export default App;
