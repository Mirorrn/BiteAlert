import React, { useState, useRef, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import {
  HandLandmarker,
  FilesetResolver,
  FaceDetector,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

import { drawLandmarks } from "@mediapipe/drawing_utils";

const FINGER_TIPS_IDS = [4, 8, 12, 16, 20];
const mouthKeypointIndices = 3; // Adjust based on actual keypoints for mouth

const NAIL_BITING_DISTANCE_THRESHOLD = 0.02; // Adjust this threshold based on your requirements
const SLIDING_WINDOW_SIZE = 30; // Size of the sliding window
const MAJORITY_THRESHOLD = 0.6; // Percentage of true frames to confirm nail-biting

const calculateDistance = (
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) => {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
};

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
  const faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      delegate: "GPU",
    },
  });

  console.log("Hand detection model loaded");
  return [handLandmarker, faceDetector];
}

const DetectionComponent: React.FC = () => {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isWebcamReady, setIsWebcamReady] = useState(false);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
    null
  );
  const [faceDetector, setFaceDetector] = useState<FaceDetector | null>(null);
  const frameResults = useRef<boolean[]>(
    Array(SLIDING_WINDOW_SIZE).fill(false)
  );
  const currentIndex = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const processFrame = useCallback(async () => {
    if (
      !webcamRef.current ||
      !canvasRef.current ||
      !handLandmarker ||
      !faceDetector
    ) {
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

    // Set canvas width and height to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if (video && ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      let fingerTips = null;
      let mouthKeypoints = null;

      const [result_hand, results_face] = await Promise.all([
        handLandmarker.detect(video),
        faceDetector.detect(video),
      ]);

      for (const detection of results_face.detections) {
        mouthKeypoints = detection.keypoints[mouthKeypointIndices];
        drawLandmarks(ctx, [mouthKeypoints], {
          color: "#00FF00", // Different color for mouth keypoints
          lineWidth: 1,
        });
      }

      for (const landmarks of result_hand.landmarks) {
        if (fingerTips) {
          fingerTips = fingerTips.concat(
            FINGER_TIPS_IDS.map((index) => landmarks[index])
          );
        } else {
          fingerTips = FINGER_TIPS_IDS.map((index) => landmarks[index]);
        }

        drawLandmarks(ctx, fingerTips, {
          color: "#FF0000",
          lineWidth: 1,
        });
      }

      let nailBitingDetected = false;
      if (fingerTips && mouthKeypoints) {
        for (const tip of fingerTips) {
          const distance: number = calculateDistance(tip, mouthKeypoints);
          if (distance <= NAIL_BITING_DISTANCE_THRESHOLD) {
            nailBitingDetected = true;
            break;
          }
        }
      }

      frameResults.current[currentIndex.current] = nailBitingDetected;
      currentIndex.current = (currentIndex.current + 1) % SLIDING_WINDOW_SIZE;

      const trueCount = frameResults.current.reduce(
        (count, value) => count + Number(value),
        0
      );

      if (trueCount / SLIDING_WINDOW_SIZE >= MAJORITY_THRESHOLD) {
        console.log("Nail-biting detected!");
      }
    }
    window.requestAnimationFrame(processFrame);
  }, [webcamRef, canvasRef, handLandmarker, faceDetector]);

  useEffect(() => {
    loadModel()
      .then(([hand_model, face_model]) => {
        console.log("Hand model loaded:", hand_model);
        setHandLandmarker(hand_model);
        console.log("Face model loaded:", face_model);
        setFaceDetector(face_model);
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
    <div className="detection-container">
      {(!isWebcamReady || isModelLoading) && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="video-wrapper">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
          onUserMedia={handleWebcamReady}
        />
        <canvas ref={canvasRef} className="canvas" />
      </div>
    </div>
  );
};

export default DetectionComponent;
