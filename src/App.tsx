// src/App.tsx
import React from "react";
import WebcamComponent from "./components/DetectionComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import "./App.css";
import "./style.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Header />
        <WebcamComponent />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
