import { useEffect, useState } from "react";
import Button from "../Button";
import { categories, letters } from "./data.js";
import "./App.css";

function App() {
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [visibility, setVisibility] = useState(true);
  const [gameOptions, setGameOptions] = useState({
    category: "",
    difficulty: "easy",
  });
  const [randomWord, setRandomWord] = useState("");
  const [incorrectAnswerCounter, setIncorrectAnswerCounter] = useState(0);
  const [time, setTime] = useState(30);
  const [selectedLetters, setSelectedLetters] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    if (isGameWon) return;
    const categoryArray = categories[gameOptions.category];
    setRandomWord(
      categoryArray?.[Math.floor(Math.random() * categoryArray.length)]
    );

    if (gameOptions.difficulty === "easy") return;
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [gameOptions.category]);

  const updateMatchedLetters = (letter) => {
    const wordLetters = randomWord.name.toLowerCase().split("");
    const matches = wordLetters.filter((char) => char === letter);
    setCorrectAnswer((prev) => prev + matches.join(""));
  };

  const handleLetterGuess = (letter) => {
    if (correctAnswer.includes(letter)) return;
    if (randomWord?.name.toLowerCase().includes(letter))
      updateMatchedLetters(letter);

    if (!randomWord?.name?.toLowerCase().includes(letter))
      setIncorrectAnswerCounter((prev) => prev + 1);
  };

  useEffect(() => {
    if (
      correctAnswer.replaceAll(",", "").length ===
      randomWord?.name?.split("").length
    )
      setIsGameWon(true);
  }, [correctAnswer]);

  return (
    <>
      {visibility && (
        <>
          <div className="overlay">
            <p className="mode-p">Chose Mode:</p>
            <div className="difficulty-box">
              <Button
                btnType={"button"}
                variation={selectedBtn === 1 ? "primary-red" : "primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, difficulty: "easy" });
                  setSelectedBtn(1);
                }}
              >
                EASY
              </Button>
              <Button
                btnType={"button"}
                variation={selectedBtn === 2 ? "primary-red" : "primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, difficulty: "hard" });
                  setSelectedBtn(2);
                }}
              >
                HARD
              </Button>
            </div>
            <p className="category-p">Chose Category to start the game:</p>
            <div className="category-box">
              <Button
                btnType={"button"}
                variation={"primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, category: "movie" });
                  setVisibility(false);
                }}
              >
                MOVIE
              </Button>
              <Button
                btnType={"button"}
                variation={"primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, category: "country" });
                  setVisibility(false);
                }}
              >
                COUNTRY
              </Button>
              <Button
                btnType={"button"}
                variation={"primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, category: "animal" });
                  setVisibility(false);
                }}
              >
                ANIMAL
              </Button>
              <Button
                btnType={"button"}
                variation={"primary"}
                clickAction={() => {
                  setGameOptions({ ...gameOptions, category: "tvshow" });
                  setVisibility(false);
                }}
              >
                TVSHOW
              </Button>
            </div>
          </div>
        </>
      )}
      <>
        <nav>
          <h1>Hangman. Do (or) Die</h1>
          <div className="nav-box">
            <p className="guessed-wrong">
              Guessed wrong:{" "}
              <span className="guessed-wrong">{incorrectAnswerCounter}</span>
            </p>
            {gameOptions.difficulty === "hard" &&
              incorrectAnswerCounter < 6 &&
              !isGameWon && (
                <p className="time-left-p">
                  Time left: 00:
                  <span className="time-left">
                    {time < 10 && 0}
                    {time}
                  </span>{" "}
                </p>
              )}
          </div>
          <Button
            btnType={"button"}
            variation={"primary"}
            clickAction={() => {
              setVisibility(true);
            }}
          >
            Change Category
          </Button>
        </nav>
        <main className="container">
          {
            <img
              src={`${incorrectAnswerCounter}wrongGuess.png`}
              alt={`${incorrectAnswerCounter} wrong Guess`}
            />
          }
          <p className="guess-p">
            Guess the <span>{gameOptions.category}</span>:
          </p>
          <p className="word">
            {randomWord?.name?.split("").map((letter, index) => (
              <span key={index}>
                {correctAnswer.includes(letter.toLowerCase()) ? letter : "_"}{" "}
              </span>
            ))}
          </p>
          {incorrectAnswerCounter === 6 || time === 0 ? (
            <p className="lost-p">You lost...</p>
          ) : isGameWon ? (
            <p className="win-p">You win!</p>
          ) : (
            ""
          )}
          {incorrectAnswerCounter < 6 && isGameWon === false && time > 0 && (
            <div className="btn-box">
              {letters.map((letter, index) => {
                return (
                  <Button
                    key={index}
                    btnType={"button"}
                    variation={
                      letter === ""
                        ? ""
                        : selectedLetters.split("").includes(letter)
                        ? "secondary-red"
                        : "secondary"
                    }
                    clickAction={() => {
                      handleLetterGuess(letter);
                      setSelectedLetters((prev) => prev + letter);
                    }}
                  >
                    <p
                      className={
                        selectedLetters.split("").includes(letter) ? "fall" : ""
                      }
                    >
                      {letter.toUpperCase()}
                    </p>
                  </Button>
                );
              })}
            </div>
          )}
          <Button
            btnType={"button"}
            variation={"secondary"}
            clickAction={() => {
              setSelectedBtn(1);
              setVisibility(true);
              setTime(30);
              setIncorrectAnswerCounter(0);
              setIsGameWon(false);
              setCorrectAnswer("");
              setGameOptions({
                category: "",
                difficulty: "easy",
              });
              setSelectedLetters("");
            }}
          >
            Reset
          </Button>
        </main>
      </>
    </>
  );
}

export default App;
