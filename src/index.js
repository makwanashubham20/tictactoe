import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const history = [];

function RenderSquare(props) {
  return <button class="square" onClick={props.onClick}>{props.value}</button>;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(arg) {
    if (this.props.input[arg] == '' && WinnerChecker(this.props.input) == 0) {
      this.props.handle(arg);
    }
  }

  render() {
    return (
      <div>
        <div class="board-row">
          <RenderSquare onClick={() => this.handleChange(0)} value={this.props.input[0]} />
          <RenderSquare onClick={() => this.handleChange(1)} value={this.props.input[1]} />
          <RenderSquare onClick={() => this.handleChange(2)} value={this.props.input[2]} />
        </div>
        <div class="board-row">
          <RenderSquare onClick={() => this.handleChange(3)} value={this.props.input[3]} />
          <RenderSquare onClick={() => this.handleChange(4)} value={this.props.input[4]} />
          <RenderSquare onClick={() => this.handleChange(5)} value={this.props.input[5]} />
        </div>
        <div class="board-row">
          <RenderSquare onClick={() => this.handleChange(6)} value={this.props.input[6]} />
          <RenderSquare onClick={() => this.handleChange(7)} value={this.props.input[7]} />
          <RenderSquare onClick={() => this.handleChange(8)} value={this.props.input[8]} />
        </div>
      </div>
    );
  };
}

function WinnerChecker(input) {
  const validPairs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < validPairs.length; i++) {
    if (
      input[validPairs[i][0]] &&
      input[validPairs[i][0]] == input[validPairs[i][1]] &&
      input[validPairs[i][1]] == input[validPairs[i][2]]
    ) {
      return input[validPairs[i][0]];
    }
  }
  return 0;
}

class ShowNav extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.handle(this.props.index);
  }

  render() {
    var element;
    if (this.props.index == 0) {
      element = <li><button onClick={this.handleChange}>Go to game start</button></li>;
    }
    else {
      element = <li><button onClick={this.handleChange}>Go to move #{this.props.index}</button></li>;
    }
    return (element);
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = { step: 0, board: ['', '', '', '', '', '', '', '', ''], last: 0 };
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    history.push(['', '', '', '', '', '', '', '', '']);
    this.handleInput = this.handleInput.bind(this);
    this.gotoStep = this.gotoStep.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState({ step: 0, board: ['', '', '', '', '', '', '', '', ''], last: 0 })
  }

  handleInput(arg) {
    console.log(this.state.board)
    const temp = this.state.board.slice(0, 9);
    if (this.state.step % 2 == 0) {
      temp[arg] = 'X';
    }
    else {
      temp[arg] = 'O';
    }
    history[this.state.step + 1] = temp;
    this.setState({ board: temp, step: this.state.step + 1, last: this.state.step + 1 })
  }

  gotoStep(arg) {
    this.setState({ step: arg, board: history[arg] });
  }

  render() {
    const isWinner = WinnerChecker(this.state.board);
    var element;
    if (isWinner) {
      element = <p> Winner: {isWinner} </p>;
    }
    else {
      var next;
      if (this.state.step % 2 == 0) {
        next = 'X';
      }
      else {
        next = 'O';
      }
      element = <p> Next player: {next}</p>;
    }
    var his = [];
    for (let i = 0; i <= this.state.last; i++) {
      his.push(<ShowNav index={i} handle={this.gotoStep} />);
    }

    return (
      <div>
        <div id="board">
          <Board input={this.state.board} handle={this.handleInput} />
          <button id="reset" onClick={this.resetGame}>Reset Game</button>
        </div>
        <div id="nav">
          {element}
          <ol>
            {his}
          </ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
