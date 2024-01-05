import Image from 'next/image'
import styles from './page.module.css'"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function Square(_a) {
    var value = _a.value, onSquareClick = _a.onSquareClick;
    return (<button className="square" onClick={onSquareClick}>
      {value}
    </button>);
}
function Board(_a) {
    var xIsNext = _a.xIsNext, squares = _a.squares, onPlay = _a.onPlay;
    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        var nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        }
        else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }
    var winner = calculateWinner(squares);
    var status;
    if (winner) {
        status = 'Winner: ' + winner;
    }
    else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
    return (<>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={function () { return handleClick(0); }}/>
        <Square value={squares[1]} onSquareClick={function () { return handleClick(1); }}/>
        <Square value={squares[2]} onSquareClick={function () { return handleClick(2); }}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={function () { return handleClick(3); }}/>
        <Square value={squares[4]} onSquareClick={function () { return handleClick(4); }}/>
        <Square value={squares[5]} onSquareClick={function () { return handleClick(5); }}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={function () { return handleClick(6); }}/>
        <Square value={squares[7]} onSquareClick={function () { return handleClick(7); }}/>
        <Square value={squares[8]} onSquareClick={function () { return handleClick(8); }}/>
      </div>
    </>);
}
function Game() {
    // const [xIsNext, setXIsNext] = useState(true);
    var _a = (0, react_1.useState)([Array(9).fill(null)]), history = _a[0], setHistory = _a[1];
    var _b = (0, react_1.useState)(0), currentMove = _b[0], setCurrentMove = _b[1];
    var xIsNext = currentMove % 2 === 0;
    var currentSquares = history[currentMove];
    //const currentSquares = history[history.length - 1];
    function handlePlay(nextSquares) {
        var nextHistory = __spreadArray(__spreadArray([], history.slice(0, currentMove + 1), true), [nextSquares], false);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        // setXIsNext(!xIsNext);
    }
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        // setXIsNext(nextMove % 2 === 0);
    }
    var moves = history.map(function (squares, move) {
        var description;
        if (move > 0) {
            description = 'Go to move #' + move;
        }
        else {
            description = 'Go to game start';
        }
        return (<li key={move}>
        <button onClick={function () { return jumpTo(move); }}>{description}</button>
      </li>);
    });
    return (<div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
       <ol>{moves}</ol>
      </div>
    </div>);
}
exports.default = Game;
function calculateWinner(squares) {
    var lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (var i = 0; i < lines.length; i++) {
        var _a = lines[i], a = _a[0], b = _a[1], c = _a[2];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
