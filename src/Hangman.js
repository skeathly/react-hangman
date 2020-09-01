import React, { useState, useEffect } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

const Hangman = () => {
  const images = [img0, img1, img2, img3, img4, img5, img6];
  const maxWrong = 6;
  const [nWrong, setnWrong] = useState(0);
  const [guessed, setGuessed] = useState(new Set());
  const [answer, setAnswer] = useState(randomWord());
  const [hangchars, setHangChars] = useState('');
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    const tempChars = '_'.repeat(answer.length)
    setHangChars(tempChars);
  }, []);

  useEffect(() => {
    isWinnerCheck();
  }, [hangchars])

  const isWinnerCheck = () => {
    const temp = hangchars;

    if (temp === answer) {
      setIsWinner(true);
    }
  }

  const reset = () => {
    setnWrong(0);
    setGuessed(new Set());
    setAnswer(randomWord());
    const tempChars = '_'.repeat(answer.length);
    setHangChars(tempChars);
    setIsWinner(false);
  }

  const handleGuess = (evt) => {
    let ltr = evt.target.value;
    setGuessed(guessed.add(ltr));

    if (!answer.includes(ltr)) {
      setnWrong(nWrong + 1);
    }

    if (answer.includes(ltr)) {
      const updatedHangchars =
        answer
          .split('')
          .map(ltr => { return (guessed.has(ltr) ? ltr : "_") });
      setHangChars(updatedHangchars.join(''));
    }
  }

  const generateButtons = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    return alphabet.map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  const gameOver = isWinner === true || nWrong >= maxWrong;
  const altText = `${nWrong}/${maxWrong} guesses`;
  let gameState = generateButtons();

  return (
    <div className='Hangman'>
      <img src={images[nWrong]} alt={altText} />
      <p className="Hangman-guesses">Guessed Wrong: {nWrong}</p>
      <p className='Hangman-word'>
        {gameOver ? answer : hangchars}
      </p>
      {!gameOver && <p className='Hangman-btns'>{gameState}</p>}
      {isWinner && <p>You won.</p>}
      {(gameOver && !isWinner) && <p>You lost.</p>}
      {gameOver && <button id='reset' onClick={reset}>Restart?</button>}
    </div>
  );

}

export default Hangman;
