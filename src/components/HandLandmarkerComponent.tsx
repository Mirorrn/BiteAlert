import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import {
  HandLandmarker,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";
import { drawLandmarks } from "@mediapipe/drawing_utils";
import "../App.css";

async function loadModel() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  const handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: "GPU",
    },
    numHands: 2,
    minHandDetectionConfidence: 0.5,
  });
  console.log("Hand detection model loaded");
  return handLandmarker;
}

const WebcamComponent: React.FC = () => {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
    null
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const processFrame = useCallback(async () => {
    if (!webcamRef.current || !canvasRef.current || !handLandmarker) {
      requestAnimationFrame(processFrame);
      return;
    }

    const video: HTMLVideoElement | null = webcamRef.current.video;

    if (!video || video.readyState !== 4) {
      requestAnimationFrame(processFrame);
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (video && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const result = await handLandmarker.detect(video);

      for (const landmarks of result.landmarks) {
        drawLandmarks(ctx, landmarks, {
          color: "#FF0000",
          lineWidth: 2,
        });
      }
    }
    requestAnimationFrame(processFrame);
  }, [webcamRef, canvasRef, handLandmarker]);

  useEffect(() => {
    loadModel()
      .then((model) => {
        console.log("Model loaded:", model);
        setHandLandmarker(model);
        setIsModelLoading(false); // Set isModelLoading to false when model is loaded
      })
      .catch((error) => {
        console.error("Error loading model:", error);
      });
  }, []);

  useEffect(() => {
    if (!isModelLoading && isWebcamReady) {
      requestAnimationFrame(processFrame);
    }
  }, [isModelLoading, isWebcamReady, processFrame]);

  const handleWebcamReady = () => {
    setIsWebcamReady(true);
  };

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      {(!isWebcamReady || isModelLoading) && (
        <div className="loading-spinner"></div>
      )}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        style={{ position: "absolute", opacity: 0 }}
        onUserMedia={handleWebcamReady}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
      />
    </div>
  );
};

export default WebcamComponent;
