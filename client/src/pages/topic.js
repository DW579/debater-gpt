import React from "react";
import "../App.css";
import { useLocation } from "react-router-dom";

export default function Topic() {
    const location = useLocation();
    
    console.log("location.state: ", location);
    return (
        <div>
            <h1>Topic</h1>
            <p>
                This is the topic page.
            </p>  
        </div>
    );
}