import React, {Component} from 'react';

// 라이프 사이클 (클래스)
// [로딩] constructor -> render -> ref -> componentDidMount ->
// [setState/props 바뀔때]shouldComponentUpdate(true)이면 -> re-render -> componentDidUpdate 아니면 리렌더 실행 X
// [부모가 컴포넌트 제거시] componentWillUnmount 실행 후 제거

const SYMBOL_POSITION = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px',
};

const SCORE = {
  rock: -1,
  scissors: 0,
  paper: 1,
};

const computerChoice = bgPosition => {
  return Object.entries(SYMBOL_POSITION).find(function(val) {
    return val[1] === bgPosition;
  })[0];
};

export default class RSP extends Component {
  state = {
    result: '',
    bgPosition: SYMBOL_POSITION.rock,
    score: 0,
  };
  interval;
  onButtonClick = choice => () => {
    clearInterval(this.interval);
    const myScore = SCORE[choice]; // 묵(-1) 빠(1) 찌(0)
    const cpuScore = SCORE[computerChoice(this.state.bgPosition)]; // 찌(0) 묵(-1) 빠(1)
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다.',
      });
    } else if (diff === -1 || diff === 2) {
      this.setState(prevState => {
        return {
          result: '이겼습니다.',
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState(prevState => {
        return {
          result: '졌습니다.',
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 200);
    }, 1000);
  };
  changeHand = () => {
    if (this.state.bgPosition === SYMBOL_POSITION.rock) {
      this.setState(prevState => (prevState.bgPosition = SYMBOL_POSITION.scissors));
    } else if (this.state.bgPosition === SYMBOL_POSITION.scissors) {
      this.setState(prevState => (prevState.bgPosition = SYMBOL_POSITION.paper));
    } else if (this.state.bgPosition === SYMBOL_POSITION.paper) {
      this.setState(prevState => (prevState.bgPosition = SYMBOL_POSITION.rock));
    }
  };
  componentDidMount() {
    // 컴포넌트 초기 렌더링 후 : 여기에 비동기 요청을 많이 한다.
    this.interval = setInterval(this.changeHand, 200);
  }
  componentDidUpdate() {
    // 리렌더링 후 : 여기에 비동기 요청을 많이 한다.
  }
  componentWillUnmount() {
    // 컴포넌트가 제거되기 직전 : DidMount 또는 DidUpdate의 비동기 요청을 정리한다.
    clearInterval(this.interval);
  }
  render() {
    return (
      <>
        <div
          id='computer'
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.state.bgPosition} 0`,
          }}></div>
        <div>
          <button id='rock' className='btn' value='rock' onClick={this.onButtonClick('rock')}>
            묵
          </button>
          <button
            id='scissors'
            className='btn'
            value='scissors'
            onClick={this.onButtonClick('scissors')}>
            찌
          </button>
          <button id='paper' className='btn' value='paper' onClick={this.onButtonClick('paper')}>
            빠
          </button>
        </div>
        <div>{this.state.result}</div>
        <div>현재 점수 : {this.state.score}</div>
      </>
    );
  }
}
