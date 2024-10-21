import React, { useContext } from "react";
import Letter from "../../molecules/Letter";
import { WordleContext } from "../../templates/WordleGame";

const Board = () => {
  const { board } = useContext(WordleContext);
  return (
    <div className="board">
      {board.map((boardRow, boardRowIndex) => (
        <div className="row" key={boardRowIndex}>
          {boardRow.map((boardLetter, boardLetterIndex) => (
            <Letter
              key={boardLetterIndex}
              letterPosition={boardLetterIndex}
              attemptValue={boardRowIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
