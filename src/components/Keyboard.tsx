import { MouseEvent } from "react";

import "./Keyboard.css";

export function Keyboard({
  handleClick,
  canUndo,
}: {
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  canUndo: boolean;
}) {
  const firstRow = [1, 2, 3, 4, 5, 6, 7, 8];
  const secondRow = [9, 10, 11, 12, 13, 14, 15];
  const thirdRow = [16, 17, 18, 19, 20, 25, 0];

  const handleClickEmitter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleClick(event);
  };

  return (
    /**
     * Build a keyboard component for Dart from 0 to 20 and 25, with double and triple
     */

    <div className="keyboard">
      <div className="row">
        {firstRow.map((number) => (
          <button onClick={handleClickEmitter} className="key" key={number}>
            {number}
          </button>
        ))}
      </div>
      <div className="row">
        {secondRow.map((number) => (
          <button onClick={handleClickEmitter} className="key" key={number}>
            {number}
          </button>
        ))}
      </div>
      <div className="row">
        {thirdRow.map((number) => (
          <button onClick={handleClickEmitter} className="key" key={number}>
            {number}
          </button>
        ))}
      </div>
      <div className="row">
        <button onClick={handleClickEmitter} className="key key__double">
          Double
        </button>
        <button onClick={handleClickEmitter} className="key key__triple">
          Triple
        </button>
        <button onClick={handleClickEmitter} className="key key__bull">
          Bull
        </button>
        <button
          disabled={!canUndo}
          onClick={handleClickEmitter}
          className="key key__revert"
        >
          Undo
        </button>
      </div>
    </div>
  );
}
