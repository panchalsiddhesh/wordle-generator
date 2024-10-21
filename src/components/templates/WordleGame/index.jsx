import React, { createContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Board from "../../organisms/Board";
import Keyboard from "../../organisms/Keyboard";
import { validateWord } from "../../../utils/validateWord";
import { debounce } from "../../../utils/debounce";
import Toast from "../../organisms/Toast";
import Modal from "../../organisms/Modal";

export const WordleContext = createContext();

const setRootProperty = (selector, property) => {
  document.documentElement.style.setProperty(selector, property);
};

const WordleGame = () => {
  const { id: urlParams } = useParams();
  const navigate = useNavigate();

  const [board, setBoard] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  const [correctWord, setCorrectWord] = useState("");
  const [numberOfGuesses, setNumberOfGuesses] = useState(null);

  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPosition: 0,
  });

  const [correctLetters, setCorrectLetters] = useState([]);
  const [almostLetters, setAlmostLetters] = useState([]);
  const [disabledLetters, setDisabledLetters] = useState([]);

  // Toast and Modal States
  const [showInvalidWordToast, setShowInvalidWordToast] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);

  const onSelectLetter = (keyValue) => {
    if (showWinModal) return;
    if (showLoseModal) return;
    if (currentAttempt.letterPosition > correctWord.length - 1) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition] = keyValue;
    setBoard(newBoard);
    setCurrentAttempt((prev) => ({
      ...prev,
      letterPosition: prev.letterPosition + 1,
    }));
  };

  const onDelete = () => {
    if (currentAttempt.letterPosition == 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPosition - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt((prev) => ({
      ...prev,
      letterPosition: prev.letterPosition - 1,
    }));
  };

  const onEnter = async () => {
    if (currentAttempt.letterPosition != correctWord.length) return;

    let currentWord = "";
    for (let i = 0; i < correctWord.length; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    const isValidWord = await validateWord(currentWord);

    if (isValidWord) {
      setCurrentAttempt((prev) => ({
        ...prev,
        attempt: prev.attempt + 1,
        letterPosition: 0,
      }));
    } else {
      setShowInvalidWordToast(true);
      setTimeout(() => {
        setShowInvalidWordToast(false);
      }, 1500);
    }

    if (currentWord == correctWord) {
      setShowWinModal(true);
      return;
    }

    if (currentAttempt.attempt == numberOfGuesses - 1) {
      setShowLoseModal(true);
    }
  };

  const onDebouncedEnter = debounce(onEnter, 500);

  useEffect(() => {
    if (correctWord && numberOfGuesses) {
      let correctWordLength = correctWord.length;

      let defaultBoard = Array(numberOfGuesses)
        .fill(null)
        .map(() => Array(correctWordLength).fill(""));
      setBoard(defaultBoard);
      setRootProperty("--correct-word-length", Number(correctWord.length));
      setRootProperty("--number-of-guesses", Number(numberOfGuesses));
    }
  }, [correctWord, numberOfGuesses]);

  useEffect(() => {
    const handleURLParams = async () => {
      if (urlParams) {
        const isValidFormat = /^[A-Za-z0-9+/=]+-\d+$/.test(urlParams);
        if (!isValidFormat) {
          throw new Error(
            "Invalid URL format. Expected format: 'encodedWord-numberOfGuesses'"
          );
        }
        let searchParams = urlParams.split("-");
        const encodedWord = searchParams[0];

        try {
          const decodedWord = window.atob(encodedWord).toUpperCase();
          const isDecodedWordValid = await validateWord(decodedWord);
          if (isDecodedWordValid) {
            setCorrectWord(decodedWord);
          } else {
            navigate("/error");
            throw new Error("Invalid decoded word. Word not in word bank");
          }
        } catch (error) {
          throw new Error("Invalid encoded word. Unable to decode.");
        }

        let guesses = searchParams[1];
        if (guesses < 5 || guesses > 8) {
          throw new Error("Invalid number of guesses.");
        }
        setNumberOfGuesses(Number(guesses));
      }
    };

    handleURLParams();
  }, [urlParams]);

  return (
    <>
      <WordleContext.Provider
        value={{
          board,
          setBoard,
          correctWord,
          numberOfGuesses,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          onDebouncedEnter,
          disabledLetters,
          setDisabledLetters,
          correctLetters,
          setCorrectLetters,
          almostLetters,
          setAlmostLetters,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
          {showInvalidWordToast ? <Toast text={"Invalid Word!"} /> : null}
          {showWinModal ? <Modal win={true} /> : null}
          {showLoseModal ? <Modal win={false} /> : null}
        </div>
      </WordleContext.Provider>
    </>
  );
};

export default WordleGame;
