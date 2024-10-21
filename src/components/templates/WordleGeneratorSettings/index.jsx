import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { validateWord } from "../../../utils/validateWord";
import { debounce } from "../../../utils/debounce";

const WordleGeneratorSettings = () => {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState("");
  const [showCopyLinkToast, setShowCopyLinkToast] = useState(false);
  const timeoutRef = useRef(null);

  const handleGenerateLink = useCallback(
    async (event) => {
      const isValidWord = await validateWord(word);

      if (isValidWord) {
        const encodedWord = btoa(word);
        const link = `${window.location.origin}/wordle-generator/game/${encodedWord}-${guesses}`;

        navigator.clipboard.writeText(link);
        setShowCopyLinkToast(true);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set a new timeout and store its ID
        timeoutRef.current = setTimeout(() => {
          setShowCopyLinkToast(false);
        }, 2000);
      }
    },
    [word, guesses]
  );

  const debouncedHandleGenerateLink = debounce(handleGenerateLink, 500);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current); // Clear timeout on unmount
    };
  }, []);

  return (
    <section className="generator-settings-section">
      <div className="generator-settings-card">
        {/* Title */}
        <header className="generator-settings-card__header">
          <p className="generator-settings-text">Settings</p>
        </header>

        {/* Form Content */}
        <div className="generator-settings-card__body">
          {/* Custom word input */}
          <div className="generator-settings-form-input">
            <label className="generator-settings-input-label">
              Enter custom word (4 - 10 chars)
            </label>
            <input
              className="generator-settings-input"
              type="text"
              placeholder="Enter your word"
              value={word}
              onChange={(e) => {
                const { value } = e.target;
                if (
                  value.length <= 10 &&
                  (value === "" || /^[A-Za-z]*$/.test(value))
                ) {
                  setWord(value);
                }
              }}
              maxLength={10}
              required
            />
          </div>
          {/* Number of Guesses Input */}
          <div className="generator-settings-form-input">
            <label className="generator-settings-input-label">
              Enter number of guesses (5 - 8 guesses)
            </label>
            <input
              className="generator-settings-input"
              type="text"
              placeholder="Enter number of guesses"
              maxLength={2}
              value={guesses}
              onChange={(e) => {
                const { value } = e.target;
                if (value == "") {
                  setGuesses(value);
                  return;
                }
                if (/^[0-9]*$/.test(Number(value))) {
                  const numValue = Number(value);
                  if (numValue >= 5 && numValue <= 8) {
                    setGuesses(value);
                  }
                }
              }}
            />
          </div>
          {/* CTA */}
          <button
            className="generator-settings-form-button"
            onClick={debouncedHandleGenerateLink}
            disabled={word == "" || word.length < 4 || guesses == ""}
          >
            COPY LINK
          </button>

          {/* Copy Link Toast */}
          {showCopyLinkToast ? (
            <div className="generator-settings-copy-toast">Link Copied! 🎉</div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default WordleGeneratorSettings;
