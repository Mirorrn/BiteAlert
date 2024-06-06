// src/App.tsx
import React from "react";
import WebcamComponent from "./components/DetectionComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./components/Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Home />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
