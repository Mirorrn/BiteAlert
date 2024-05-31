// src/components/WebcamVideoComponent.tsx
import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import * as mpHands from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

type Video_config = {
  width: number;
  height: number;
  facingMode: string;
};

let WebcamVideoComponent: React.FC = () => {
  const videoConstraints: Video_config = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div>
      <Webcam
        audio={false}
        // height={720}
        screenshotFormat="image/jpeg"
        // width={1280}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

//export default WebcamVideoComponent;

async function loadModel() {
  const vision = await FilesetResolver.forVisionTasks(
    // path/to/wasm/root
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: "src/assets/models/hand_landmarker.task",
    },
    numHands: 2,
  });
  console.log(handLandmarker);
  return handLandmarker;
}

const HandLandmarkerComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let test_obj = null;
  useEffect(() => {
    test_obj = loadModel();
  }, []);

  console.log(test_obj);
  console.log("Hi");

  /* const onResults = (results: mpHands.Results) => {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement?.getContext('2d');

    if (canvasCtx) {
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          mpHands.drawConnectors(canvasCtx, landmarks, mpHands.HAND_CONNECTIONS, {
            color: '#00FF00',
            lineWidth: 5,
          });
          mpHands.drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
        }
      }
      canvasCtx.restore();
    }
  };
  */
  /*  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }}></video>
      <canvas
        ref={canvasRef}
        width="1280"
        height="720"
        style={{ width: "100%", height: "auto" }}
      ></canvas>
    </div>
  );
}; */
  const videoConstraints: Video_config = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <div>
      <Webcam
        audio={false}
        // height={720}
        screenshotFormat="image/jpeg"
        // width={1280}
        videoConstraints={videoConstraints}
      />
    </div>
  );
};

export default HandLandmarkerComponent;
