import React, { useState } from "react";
import { useRef } from "react/cjs/react.development";
import useTensorflow from "../utils/hooks/useTensorflow";
function Image({ index, image, handleRemove, show }) {
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef();
  const { predict, predictions, setPredictions } = useTensorflow();

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {predictions.length > 0 && (
        <span
          onClick={() => setPredictions({})}
          className="absolute bg-gray-300 text-black rounded-md shadow px-2 left-0 ml-5"
        >
          {predictions.map((prediction) => (
            <div className="flex justify-between">
              <p>{prediction.className}</p>
              <p>{Math.floor(prediction.probability * 100)} %</p>
            </div>
          ))}
        </span>
      )}
      <i
        className={`fas fa-search absolute left-0 cursor-pointer opacity-25 hover:opacity-100 ${
          isHovering ? "" : "hidden"
        }`}
        onClick={() => predict(imageRef.current)}
      ></i>
      <i
        className={`fas fa-times absolute right-0 cursor-pointer opacity-25 hover:opacity-100 ${
          isHovering ? "" : "hidden"
        }`}
        onClick={() => handleRemove(index)}
      ></i>
      <img
        ref={imageRef}
        onClick={show}
        src={image}
        width="100%"
        height="auto"
        crossOrigin="anonymous"
      />
    </div>
  );
}

Image.propTypes = {
  show: (props, propName) => {
    if (typeof props[propName] !== "function") {
      return new Error(
        `${propName} must be a function but you have provided ${typeof props[
          propName
        ]}`
      );
    }
  },
  index: (props, propName) => {
    if (typeof props[propName] !== "number") {
      return new Error(
        `${propName} must be a number but you have provided ${typeof props[
          propName
        ]}`
      );
    }
  },
};
export default Image;
