import "./game-field.css"

const GameField = () => {
    return (
        <div className="wrapper" onClick={clicGameField}>
            <div className="cell" data-num="0"></div>
            <div className="cell" data-num="1"></div>
            <div className="cell" data-num="2"></div>
            <div className="cell" data-num="3"></div>
            <div className="cell" data-num="4"></div>
            <div className="cell" data-num="5"></div>
            <div className="cell" data-num="6"></div>
            <div className="cell" data-num="7"></div>
            <div className="cell" data-num="8"></div>
        </div>
    )
}

const arr = [null, null, null, null, null, null, null, null, null]
const arrData = document.querySelectorAll("[data-num]")

const concat = (a, b, c) => {
    const result = arr[a] + arr[b] + arr[c]

    switch (result) {
        case "XXnull": 
            return["X", c]
        case "XnullX": 
            return["X", b]
        case "nullXX": 
            return["X", a]
        case "OOnull": 
            return["O", c]
        case "OnullO": 
            return["O", b]
        case "nullOO": 
            return["O", a]
    }   
}

const checkWin = () => {
    for(let i = 0; i < 3; i =+1) {
        const result = concat(i, i + 3, i + 6)

        if (result === "XXX" || result === "OOO") {
            return console.log("game finihsed")
        }
    }
}

const clicGameField = (e) => {
   
    if(e.target.textContent === "") {
        e.target.textContent = "X"

        arr[e.target.dataset.num] = "X"

        checkWin()
    }

    
}

export default GameField