import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

function Game({ onGameEnd }) {
  const [countdown, setCountdown] = useState(5);
  const [userGesture, setUserGesture] = useState(null);
  const [appGesture, setAppGesture] = useState(null);
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);

  useEffect(() => {
    console.log("Initializing video stream...");
    // Setup logic to initialize video stream and assign it to videoRef.srcObject
    if (videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          console.log("Video stream initialized successfully.");
          videoRef.current.srcObject = stream;
        })
        .catch(err => {
          console.error("Error initializing video stream: ", err);
        });
    }

    return () => {
      console.log("Cleaning up video stream...");
      // Cleanup logic
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => {
          console.log(`Stopping ${track.kind} track.`);
          track.stop();
        });
        videoRef.current.srcObject = null;
        console.log("Video stream cleaned up successfully.");
      }
    };
  }, []); // Adjust dependencies as needed

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      detectGesture();
    }
  }, [countdown]);

  const detectGesture = async () => {
    if (model && videoRef.current) {
      const predictions = await model.estimateHands(videoRef.current);
      if (predictions.length > 0) {
        const gesture = recognizeGesture(predictions[0].landmarks);
        setUserGesture(gesture);
        const computerGesture = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        setAppGesture(computerGesture);
        onGameEnd({ user: gesture, app: computerGesture });
      }
    }
  };

  const recognizeGesture = (landmarks) => {
    // Implement gesture recognition logic here
   
    const fingerTips = [8, 12, 16, 20];
    const thumbTip = 4;
    const palmBase = 0;

    const extendedFingers = fingerTips.filter(tip => 
      landmarks[tip][1] < landmarks[tip - 2][1]
    ).length;

    const thumbExtended = landmarks[thumbTip][0] > landmarks[palmBase][0];

    if (extendedFingers === 0 && !thumbExtended) return 'rock';
    if (extendedFingers === 5 && thumbExtended) return 'paper';
    if (extendedFingers === 2 && !thumbExtended) return 'scissors';
    return 'unknown';
  };

  return (
    <div className="game">
      <h2>Get Ready!</h2>
      <p>{countdown > 0 ? countdown : 'Show your gesture!'}</p>
      <video ref={videoRef} autoPlay style={{ transform: 'scaleX(-1)' }} />
    </div>
  );
}

export default Game;