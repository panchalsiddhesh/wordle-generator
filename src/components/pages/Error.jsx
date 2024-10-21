import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <p className="error-page__title">
        The page you are looking for doesnt exist.
      </p>
      <button
        className="error-page__button"
        onClick={() => {
          navigate("/wordle-generator/");
        }}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error;
