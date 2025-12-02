import { useEffect, useState } from "react";
import Button from "../Button";
import { categories } from "./data.js";
import "./App.css";

function App() {
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [visibility, setVisibility] = useState(true);
  const [gameOptions, setgameOptions] = useState({
    category: "animals",
    difficulty: "easy",
  });
  const [selectedLetter, setLetter] = useState("");
  const [randomWord, setRandomWord] = useState("");
  const [ansver, setAnsver] = useState("");
  const [incorrectAnswerCounter, setincorrectAnswerCounter] = useState(0);
  const [time, setT] = useState(30);
}

export default App;
