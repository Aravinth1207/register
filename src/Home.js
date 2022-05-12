import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";


export const Home = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/register" element={<App />} />
                </Routes>
            </Router>
        </>
    )
}