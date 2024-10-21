import React, { useContext, useEffect, useState } from "react";
import { WordleContext } from "../../templates/WordleGame";

const Letter = ({ letterPosition = 0, attemptValue = 0 }) => {
  const [scaleAnimation, setScaleAnimation] = useState(false);
  const {
    board,
    correctWord,
    currentAttempt,
    setDisabledLetters,
    setCorrectLetters,
    setAlmostLetters,
  } = useContext(WordleContext);
  const letter = board[attemptValue][letterPosition];

  let isCorrect = correctWord[letterPosition] == letter;
  let isAlmost = !isCorrect && letter != "" && correctWord.includes(letter);
  const letterState =
    currentAttempt.attempt > attemptValue &&
    (isCorrect ? "correct" : isAlmost ? "almost" : "error");

  useEffect(() => {
    if (letter != "" && isCorrect) {
      setCorrectLetters((prev) => [...prev, letter]);
    }
    if (letter != "" && isAlmost) {
      setAlmostLetters((prev) => [...prev, letter]);
    }
    if (letter != "" && !isCorrect && !isAlmost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);

  useEffect(() => {
    if (letter != "") {
      setScaleAnimation(true);
      const timer = setTimeout(() => {
        setScaleAnimation(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [letter]);

  return (
    <div
      className={`letter ${scaleAnimation ? "scale" : ""}`}
      id={letterState ? letterState : null}
    >
      {letter}
    </div>
  );
};

export default Letter;
