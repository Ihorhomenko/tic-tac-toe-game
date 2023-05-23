// import { useState, useEffect } from "react"

// import Cell from "./cell"

import "./game-field.css"

// const GameField = () => {
    
//     const [board, setBoard] = useState(Array(9).fill(""))
//     const [winner, setWinner] = useState(null)

//     useEffect(() => {
//         const winsPositions = [
//             [0, 1, 2],
//             [3, 4, 5],
//             [6, 7, 8],
//             [0, 3, 6],
//             [1, 4, 7],
//             [2, 5, 8],
//             [0, 4, 8],
//             [2, 4, 6]
//         ]

//         let winPositInd = 0;
//         let newWinner = null;

//         while(winPositInd < winsPositions.length && !newWinner) {
//             const boardPositionToCheck = winsPositions[winPositInd];
//             const boardValuesToCheck = boardPositionToCheck.map(i => board[i])
//             const checkValues = boardValuesToCheck[0]
//             const isFinished = boardValuesToCheck.every(value => value === checkValues && checkValues)
//             newWinner = isFinished ? checkValues : null
//             winPositInd += 1
//         }

//         if(newWinner) {
//             setWinner(newWinner === "X" ? "Гравець 1" : "Гравець 2")  
//         }

//     }, [board])

//     const hundleClick = (ind) => {
//         if(ind < 0 || ind > 9 || board[ind]) return
//         const newBoard = [...board]
//         newBoard.splice(ind, 1, "X") 
//         newElCell(newBoard)   
//         setBoard(newBoard)
//     } 
    
//     const RandCell = (ar) => {
        
//         if(ar.length === 0) return
//         const rand = Math.random() * ar.length | 0;
//         const cellValue = ar[rand];
//         return cellValue;
//     }

//     const newElCell = (board) => {

//         const indexes = [];
        
//         if (board.includes("")) {
//             let ind = board.indexOf("")

//         while (ind !== -1) {
//             if(!indexes.includes(ind)) {
//             indexes.push(ind);
//             ind = board.indexOf("", ind + 1);
//             }            
//           }            
//         }
//             const randomInd = RandCell(indexes)
//             board.splice(randomInd, 1, "O")
//     }

//     const hundleBtnClick = () => {
//         setBoard(Array(9).fill(""))
//         setWinner("")
//     }

//     return (
//         <div className="appWrapper">
//             {winner && <h2>{winner} переміг</h2>}
        
//             <div className="wrapper">
//                 {board.map((el, i) => (
//                     <Cell key={i} value={el} ind={i} hundleClick={hundleClick}/>
//             ))}
//         </div>
//             {winner && <button className="btn" type="button" onClick={hundleBtnClick}>Грати ще раз</button>}
//         </div>
        
//     )
// }



// export default GameField

import React, { useState, useEffect } from 'react';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (player === 'O' && !winner) {
      makeComputerMove();
    }
  }, [player]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  const makeComputerMove = () => {
    // Простая логика выбора хода компьютера
    const availableMoves = [];
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        availableMoves.push(i);
      }
    }

    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomIndex];

    handleClick(move);
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${player}`;
  }

  return (
    <div className="game">

{/* <div className="wrapper">
//                 {board.map((el, i) => (
//                     <Cell key={i} value={el} ind={i} hundleClick={hundleClick}/>
//             ))}
//         </div> */}
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

export default Game;