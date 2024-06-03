// src/App.tsx
import React from "react";
import WebcamComponent from "./components/HandLandmarkerComponent";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Webcam Feed</h1>
      <WebcamComponent />
    </div>
  );
};

export default App;
