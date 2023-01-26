import "./LastRound.css";

interface RoundScore {
  scores: number[];
  remaining: number;
}

export function LastRound({ currentRound }: { currentRound: RoundScore }) {
  interface currentScores {
    score_1: number | null;
    score_2: number | null;
    score_3: number | null;
  }

  const currentScores: currentScores = {
    score_1: currentRound.scores[0] || null,
    score_2: currentRound.scores[1] || null,
    score_3: currentRound.scores[2] || null,
  };

  return (
    <div className="last-round">
      <div className="last-round__score">{currentScores.score_1 ?? <br />}</div>
      <div className="last-round__score">{currentScores.score_2 ?? <br />}</div>
      <div className="last-round__score">{currentScores.score_3 ?? <br />}</div>
    </div>
  );
}
