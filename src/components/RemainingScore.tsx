import "./RemainingScore.css";

export function RemainingScore({ remaining }: { remaining: number }) {
  return (
    <header>
      <span className="heading">Remaining score</span>
      <span>{remaining}</span>
    </header>
  );
}
