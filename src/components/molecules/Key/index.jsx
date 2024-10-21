import React, { useContext } from "react";
import { WordleContext } from "../../templates/WordleGame";

const Key = ({ keyValue, bigKey, correct, almost, disabled }) => {
  const { onSelectLetter, onDelete, onDebouncedEnter } =
    useContext(WordleContext);

  const selectLetter = () => {
    if (keyValue == "ENTER") {
      onDebouncedEnter();
    } else if (keyValue == "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyValue);
    }
  };

  return (
    <div
      className={`key ${
        correct
          ? "key-correct"
          : almost
          ? "key-almost"
          : disabled
          ? "key-disabled"
          : ""
      }`}
      id={`${bigKey ? "big" : ""}`}
      onClick={selectLetter}
    >
      {keyValue}
    </div>
  );
};

export default Key;
