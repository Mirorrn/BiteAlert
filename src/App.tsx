// src/App.tsx
import React from "react";
import WebcamComponent from "./components/DetectionComponent";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="page-container">
      <Router>
        <NavBar />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detection" element={<WebcamComponent />} />
            {/* Add more routes here as needed */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;