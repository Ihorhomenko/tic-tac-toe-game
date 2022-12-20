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


    }, [board])

    const hundleClick = (ind) => {
        if(ind < 0 || ind > 9 || board[ind] || winner) return
        const newBoard = [...board]
        newBoard.splice(ind, 1, "X") 
        newElCell(newBoard)   
        setBoard(newBoard)


    } 
    
    const RandCell = (ar) => {
        if(ar.length === 0) return
        const rand = Math.random() * ar.length | 0;
        const cellValue = ar[rand];
        return cellValue;
    }

    const newElCell = (board) => {
        const indexes = [];

        if (board.includes("")) {
            let ind = board.indexOf("")

        while (ind !== -1 ) {
            if(!indexes.includes(ind)) {
            indexes.push(ind);
            ind = board.indexOf("", ind + 1);
            }            
          }            
        }
            const randomInd = RandCell(indexes)
            if(winner) return
            board.splice(randomInd, 1, "O")
    }

    const hundleBtnClick = () => {
        setBoard(Array(9).fill(""))
        setWinner("")
    }

    return (
        <div>
            {winner && <h2>{winner} переміг</h2>}
        
            <div className="wrapper">
                {board.map((el, i) => (
                    <Cell key={i} value={el} ind={i} hundleClick={hundleClick}/>
            ))}
        </div>
        <button type="button" onClick={hundleBtnClick}>Грати ще раз</button>
        </div>
        
    )
}



export default GameField