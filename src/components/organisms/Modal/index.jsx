import React, { useContext } from "react";
import { WordleContext } from "../../templates/WordleGame";

const Modal = ({ win }) => {
  const { correctWord } = useContext(WordleContext);
  return (
    <div className="modal">
      <p className="modal-text">
        {win ? "You won the game! 🎉" : "You lost the game!"}
      </p>
      {!win ? <p>Correct Word: {correctWord}</p> : null}
    </div>
  );
};

export default Modal;
