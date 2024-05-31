// src/App.tsx
import React from "react";
import HandLandmarkerComponent from "./components/HandLandmarkerComponent";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Webcam Feed</h1>
      <HandLandmarkerComponent />
    </div>
  );
};

export default App;
