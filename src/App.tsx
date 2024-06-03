// src/App.tsx
import React from "react";
import WebcamComponent from "./components/DetectionComponent";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Bite Buddy</h1>
      <WebcamComponent />
    </div>
  );
};

export default App;
