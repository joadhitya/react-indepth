import React, { useRef } from "react";
import "@tensorflow/tfjs";
import useTensorflow from "../utils/hooks/useTensorflow";

export default function Tensorflow() {
  const imageRef = useRef();
  const {predict, predictions, isLoading} = useTensorflow();

  return (
    <div className="flex justify-center">
      <div className="w-1/3">
        <h1 className="text-center">TensorFlow</h1>
        <img
          src="https://images.unsplash.com/photo-1604734517532-faaf676598fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
          width="400"
          ref={imageRef}
          crossOrigin="anonymous"
        />
        <div className="text-center mt-4">
          <button
            onClick={() => predict(imageRef.current)}
            className="p-2 rounded bg-red-300 text-white"
          >
            {isLoading && "🧿 Waiting"}
            {!isLoading && "Predict Result"}
          </button>
        </div>
        {predictions.length > 0 &&
          predictions.map((prediction) => (
            <div className="flex justify-between">
              <p>{prediction.className}</p>
              <p>{Math.floor(prediction.probability * 100)} %</p>
            </div>
          ))}
      </div>
    </div>
  );
}
