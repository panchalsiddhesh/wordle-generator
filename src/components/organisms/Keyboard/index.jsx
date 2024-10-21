import React, { useContext, useEffect } from "react";
import Key from "../../molecules/Key";
import { WordleContext } from "../../templates/WordleGame";

const Keyboard = () => {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const {
    onDebouncedEnter,
    onDelete,
    onSelectLetter,
    correctLetters,
    almostLetters,
    disabledLetters,
  } = useContext(WordleContext);

  const handleKeyboard = (event) => {
    const eventKey = event.key;
    if (eventKey == "Enter") {
      onDebouncedEnter();
    } else if (eventKey == "Backspace") {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (eventKey.toUpperCase() == key) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (eventKey.toUpperCase() == key) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (eventKey.toUpperCase() == key) {
          onSelectLetter(key);
        }
      });
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => (
          <Key
            key={key}
            keyValue={key}
            correct={correctLetters.includes(key)}
            almost={almostLetters.includes(key)}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key
            key={key}
            keyValue={key}
            correct={correctLetters.includes(key)}
            almost={almostLetters.includes(key)}
            disabled={disabledLetters.includes(key)}
          />
        ))}
      </div>
      <div className="line3">
        <Key keyValue={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key
            key={key}
            keyValue={key}
            correct={correctLetters.includes(key)}
            almost={almostLetters.includes(key)}
            disabled={disabledLetters.includes(key)}
          />
        ))}
        <Key keyValue={"DELETE"} bigKey />
      </div>
    </div>
  );
};

export default Keyboard;
