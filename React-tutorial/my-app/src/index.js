import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)
{
    return (
        <button className="square" onClick={ props.onClick }>
        {props.value}
      </button>
    );
}

class Board extends React.Component
{

    renderSquare(rowIndex, columnIndex)
    {
        return (
            <Square
        value={this.props.squares[rowIndex][columnIndex]}
        onClick={ (event) => this.props.onClick(event, rowIndex, columnIndex) }
      />
        );
    }

    render()
    {
        return (
            <div>
        <div className="board-row">
          {this.renderSquare(0, 0)}
          {this.renderSquare(0, 1)}
          {this.renderSquare(0, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(1, 0)}
          {this.renderSquare(1, 1)}
          {this.renderSquare(1, 2)}
        </div>
        <div className="board-row">
          {this.renderSquare(2, 0)}
          {this.renderSquare(2, 1)}
          {this.renderSquare(2, 2)}
        </div>
      </div>
        );
    }
}

class Game extends React.Component
{
    constructor()
    {
        // The 2d array representing the game board squares
        const newSquares = [...Array(3).fill(null).keys()].map(i => Array(3).fill(null));

        super();
        this.state = {
            history: [
            {
                squares: newSquares,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    render()
    {
        const history = this.state.history,
            current = history[this.state.stepNumber],
            winner = calculateWinner(current.squares);

        const moves = history.map((step, move) =>
        {
            const description = move ? `Move #${move}` : 'Game start';
            return (
              <li key={move}>
                <a href="#" onClick={() => this.jumpTo(move)}>{description}</a>
              </li>
            );
        });

        let status;
        if (winner)
        {
            status = `Winner: ${winner}`;
        }
        else
        {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(event, rowIndex, columnIndex ) => this.handleClick(event, rowIndex, columnIndex)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
        );
    }

    handleClick(event, rowIndex, columnIndex)
    {
        console.log( event );
        console.log( rowIndex );
        console.log( columnIndex );
        const history = this.state.history.slice(0, this.state.stepNumber + 1),
            current = history[history.length - 1],
            // squares = current.squares.slice();
            squares = current.squares.slice().map( (row) => {
                return row.slice();
            });

        if (calculateWinner(squares) || squares[rowIndex][columnIndex])
        {
            return;
        }
        squares[rowIndex][columnIndex] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
        {
            history: history.concat([
            {
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo( step ){
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares)
{
    console.log( "Calculating win conditions...");
    for( let i = 0; i < squares.length; i++ )
    {
        // console.log( squares[i]);
        for( let j = 0; j < squares[i].length; j++ )
        {
            // Ensure existence of all squares
            if( squares[i] && squares[1 + i] && squares[2 + i] )
            {
                let  verticalWinCheck = squares[i][j] === squares[i + 1][j] && squares[i][j] === squares[i + 2][j];
                if( verticalWinCheck)
                {
                    return squares[i][j];
                }
            }
            if( squares[i][j] && squares[i][j+1] && squares[i][j+2] )
            {
                let  horizontalWinCheck = squares[i][j] === squares[i][j + 1] && squares[i][j] === squares[i][j + 2];
                if( horizontalWinCheck )
                {
                    return squares[i][j];
                }
            }
            if( squares[i][j] && squares[i+1][j+1] && squares[i+2][j+2] )
            {
                let  diagonalWinCheck = squares[i][j] === squares[i+1][j + 1] && squares[i][j] === squares[i+2][j + 2];
                if( diagonalWinCheck )
                {
                    return squares[i][j];
                }
            }

        }

    }

    return null;
}