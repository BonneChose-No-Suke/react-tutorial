  import React  from "react"
import ReactDOM from 'react-dom/client'
import './index.css'

type squares = string[]

type BoardProps = {
  onClick: any,
  squares: string[]
}

type SquareProps = {
  onClick: any,
  value: string
}

function Square(props: SquareProps): JSX.Element {
    return (
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

function Board(props: BoardProps): JSX.Element {

  const renderSquare =(i: number) => {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  return (
    <div>
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
  );
}

function Game() {
  const squares: squares = Array(9).fill(null)
  const [history, setHistory] = React.useState<squares[]>([squares])
  const [stepNumber, setStepNumber] = React.useState(0)
  const [xIsNext, setXIsNext] = React.useState(true)
  // constructor(props: GameProps) {
  //   super(props) 
  //   this.state = {
  //     history: [{
  //       squares: Array(9).fill(null),
  //     }],
  //     stepNumber: 0,
  //     xIsNext: true,
  //   };
  // }

  const jumpTo = (step: number) => {
    setStepNumber(step)
    setXIsNext(stepNumber % 2 === 0)

  }

  const handleClick = (i: number) => {
    const currentHistory = history.slice(0, stepNumber + 1)
    const current = currentHistory[currentHistory.length - 1]
    const currentSquares = current.slice()
    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(currentHistory.concat(currentSquares))
    setStepNumber(history.length)
    setXIsNext(!xIsNext)
    // this.setState({
    //   history: history.concat([{
    //     squares: squares,
    //   }]),
    //   stepNumber: history.length,
    //   xIsNext: !this.state.xIsNext,
    // });
  }

  // render() {
    // const history = this.state.history;
    const current = history[stepNumber]
    const winner = calculateWinner(current)
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    const moves = current.map((step: string, move: number)=> {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        )
    })

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current}
            onClick={(i: number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  // }
}

// ========================================
function calculateWinner(squares: squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}

const root = ReactDOM.createRoot(document.getElementById("root")!)
root.render(<Game />)