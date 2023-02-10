import React, { useState, useMemo } from "react"
import "./App.css"
import Board from "./components/Board"
import { calculateWinner } from "./services/gameService"

const DEFAULT_BOARD = Array(9).fill('')

const Game = () => {
  const [history, setHistory] = useState([DEFAULT_BOARD])
  const [turnNumber, setTurnNumber] = useState(0)

  const currentPlayer = useMemo(() => {
    return turnNumber % 2 === 0 ? "X" : "O"
  }, [turnNumber])

  const winner = useMemo(() => {
    return calculateWinner(history[turnNumber])
  }, [history, turnNumber])

  const play = (i) => {
    if (history[turnNumber][i] || winner) {
      return
    }

    const newHistory = [...history]
    const newBoard = [...newHistory[turnNumber]]
    newBoard[i] = currentPlayer

    setHistory([
      ...newHistory.slice(0, turnNumber + 1),
      newBoard,
    ])

    setTurnNumber(turnNumber + 1)
  }

  const reset = () => {
    setTurnNumber(0)
    setHistory([DEFAULT_BOARD])
  }
  
  const jumpTo = move => setTurnNumber(move)

  return (
    <div className="game">
      <div className="game-board">
        <Board
          board={history[turnNumber]}
          ended={history.length >= 10}
          nextPlayer={currentPlayer}
          winner={winner}
          onPlay={play}
        />
      </div>
      <div className="game-info">
        <button onClick={reset}>Reset</button>
        <ol>
          {
            history.map((_, index) => (
              <button key={index} onClick={() => jumpTo(index)}>{index + 1}</button>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default Game