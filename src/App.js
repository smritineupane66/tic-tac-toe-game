// App.js
import React from 'react';
import './App.css';
// square component
function Square({value,onClick}){
  return <button className={`square ${value?value.toLowerCase():""}`} onClick={onClick}>{value}</button>
}

// board
function Board({goBack}){
  const [squares,setSquares] = React.useState(Array(9).fill(null))
  const [xIsNext,setXIsNext] = React.useState(true)
  const [gameOver,setGameOver] = React.useState(false)
  const [winner,setWinner] = React.useState(null)

  function handleClick(i){
    if(squares[i] || gameOver) return
    let nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? "X" : "O"
    setSquares(nextSquares)
    let win = calculateWinner(nextSquares)
    if(win){
      setWinner(win)
      setGameOver(true)
    } else if(!nextSquares.includes(null)){
      setWinner("Draw")
      setGameOver(true)
    } else {
      setXIsNext(!xIsNext)
    }
  }

  function newGame(){
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setGameOver(false)
    setWinner(null)
  }

  return(
    <div className="game">
      <h1>Tic-Tac-Toe</h1>
      {!gameOver && <div className="status">Turn: {xIsNext?"X":"O"}</div>}
      <div className="board-row">
        {squares.map((sq,i)=> <Square key={i} value={sq} onClick={()=>handleClick(i)}/>)}
      </div>
      {gameOver && 
        <div className="modal">
          <div className="modal-content">
            <h2>{winner==="Draw"?"It's a Draw!":`Winner: ${winner}`}</h2>
            <button className="new-game" onClick={newGame}>New Game</button>
            <button className="new-game" style={{marginTop:'10px',background:'#ff1744'}} onClick={goBack}>Back to Intro</button>
          </div>
        </div>
      }
    </div>
  )
}

// intro
function Intro({startGame}){
  return(
    <div className="intro-screen">
      <h1>Welcome to Tic-Tac-Toe!</h1>
      <p>Click start to play the game</p>
      <button className="new-game" onClick={startGame}>Start Game</button>
    </div>
  )
}

// main app
function App(){
  const [started,setStarted] = React.useState(false)
  function startGame(){setStarted(true)}
  function backToIntro(){setStarted(false)}

  return(
    <div>
      {started ? <Board goBack={backToIntro}/> : <Intro startGame={startGame}/>}
    </div>
  )
}

function calculateWinner(squares){
  const lines=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  for(let line of lines){
    const [a,b,c]=line
    if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
      return squares[a]
    }
  }
  return null
}



export default App;