import { useEffect, useState } from "react";
import { Keyboard } from "./components/Keyboard";
import "./App.css";
import { RemainingScore } from "./components/RemainingScore";
import { LastRound } from "./components/LastRound";

function App() {
  interface RoundScore {
    scores: number[];
    remaining: number;
  }

  const [remaining, setRemaining] = useState<number>(301);
  const [double, setDouble] = useState<boolean>(false);
  const [triple, setTriple] = useState<boolean>(false);
  const [history, setHistory] = useState<RoundScore[]>([]);
  const [currentRound, setCurrentRound] = useState<RoundScore>({
    scores: [],
    remaining: 301,
  });

  const throwBusted = () => {
    alert("Busted!");
  };

  const resetGame = () => {
    setRemaining(301);
    setHistory([]);
    setCurrentRound({
      scores: [],
      remaining: 301,
    });
  };

  useEffect(() => {
    if (remaining === 0) {
      alert("You won!");
      confirm("Do you want to play again?") && resetGame();
    }
  }, [remaining]);

  const updateScore = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = event.currentTarget.innerText;
    const number = parseInt(value);

    if (value === "Double") {
      setDouble(!double);
    }

    if (value === "Triple") {
      setTriple(!triple);
    }

    if (number || number === 0 || value === "Bull") {
      let score = number * (double ? 2 : triple ? 3 : 1);

      if (value === "Bull") {
        score = 25 * 2;
      }

      if (number === 0) {
        score = 0;
      }

      console.log(score);

      // prevent negative score
      if (remaining - score < 0) {
        throwBusted();
        return;
      }

      setRemaining(remaining - score);

      if (currentRound.scores.length === 3) {
        setHistory([...history, currentRound]);
        setCurrentRound({
          scores: [score],
          remaining: remaining - score,
        });
      } else {
        setCurrentRound({
          scores: [...currentRound.scores, score],
          remaining: remaining - score,
        });
      }

      setDouble(false);
      setTriple(false);
    }

    if (value === "Undo") {
      const lastScore = currentRound.scores.pop();
      const lastScoreValue = lastScore || 0;
      setRemaining(remaining + lastScoreValue);
      setCurrentRound({
        scores: currentRound.scores,
        remaining: remaining + lastScoreValue,
      });

      if (currentRound.scores.length === 0) {
        const lastRound = history.pop();
        if (lastRound) {
          setCurrentRound(lastRound);
          setRemaining(lastRound.remaining);
        }
      }
    }
  };

  const canUndo = currentRound.scores.length > 0;

  return (
    <div className="App">
      <LastRound currentRound={currentRound} />
      <RemainingScore remaining={remaining} />
      <main>
        <Keyboard
          handleClick={updateScore}
          canUndo={canUndo}
          isTriple={triple}
          isDouble={double}
        />
      </main>
    </div>
  );
}

export default App;
