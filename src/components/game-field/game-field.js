import { useState, useEffect } from "react"

import Cell from "./cell"

import "./game-field.css"

const GameField = () => {
    
    const [board, setBoard] = useState(Array(9).fill(""))
    const [winner, setWinner] = useState('')

    useEffect(() => {
        const winsPositions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let winPositInd = 0;
        let newWinner = null;

        while(winPositInd < winsPositions.length && !newWinner) {
            const boardPositionToCheck = winsPositions[winPositInd];
            const boardValuesToCheck = boardPositionToCheck.map(i => board[i])
            const checkValues = boardValuesToCheck[0]
            const isFinished = boardValuesToCheck.every(value => value === checkValues && checkValues)
            newWinner = isFinished ? checkValues : null
            winPositInd += 1
        }

        if(newWinner) {
            setWinner(newWinner === "X" ? "Гравець 1" : "Гравець 2")
        }

    }, board)

    const hundleClick = (ind) => {
        if(ind < 0 || ind > 9 || board[ind] || winner) return
        console.log(ind)
        const newBoard = [...board]
        newBoard.splice(ind, 1, "X")    
        setBoard(newBoard)
    }

    
    return (
        <div>
            {winner && <h2>{winner} переміг</h2>}
        
            <div className="wrapper">
                {board.map((el, i) => (
                    <Cell key={i} value={el} ind={i} hundleClick={hundleClick}/>
            ))}
        </div>
        </div>
        
    )
}



export default GameField