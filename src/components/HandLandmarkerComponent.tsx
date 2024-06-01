// src/components/HandLandmarkerComponent.tsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
//import * as mpHands from "@mediapipe/hands";
//import { Camera } from "@mediapipe/camera_utils";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

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
  console.log("Hand detection model loaded");
  return handLandmarker;
}
//console.log(test);
//const test: any = loadModel();

let WebcamComponent: React.FC = () => {
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);
  const handleStartWebcam = () => {
    setIsWebcamOn(true);
  };

  const processFrame = useCallback(() => {
    if (!webcamRef.current || !canvasRef.current) {
      requestAnimationFrame(processFrame);
      return;
    }

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (video && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Example processing: Invert colors
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      //const data = imageData.data;
      //console.log(data);
      /*  if (!data) {
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i]; // Red
          data[i + 1] = 255 - data[i + 1]; // Green
          data[i + 2] = 255 - data[i + 2]; // Blue
        }
      } */
      ctx.putImageData(imageData, 0, 0);
    }

    requestAnimationFrame(processFrame);
  }, [webcamRef, canvasRef]);

  useEffect(() => {
    //const images_concat = [...capturedImages.slice(1, 3), imageSrc];
    //console.log(images_concat.length);
    requestAnimationFrame(processFrame);
    // const handLandmarkerResult = test.detect(imageSrc);
    // console.log("handLandmarkerResult");
  }, [processFrame]);
  return (
    <div>
      <button onClick={handleStartWebcam}>Start Detection</button>
      {isWebcamOn && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={640}
            height={480}
          />
        </div>
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default WebcamComponent;

//export default HandLandmarkerComponent;
