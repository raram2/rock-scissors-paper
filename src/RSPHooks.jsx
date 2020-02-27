import React, {useState, useRef, useEffect} from 'react';

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

const RSP = () => {
  const [result, setResult] = useState('');
  const [bgPosition, setBgPosition] = useState(SYMBOL_POSITION.rock);
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  useEffect(() => {
    // componentDidMount, componentDidUpdate 로직
    interval.current = setInterval(changeHand, 200);
    return () => {
      // componentDidUnmount 로직
      clearInterval(interval.current);
    };
  }, [bgPosition]);

  const onButtonClick = choice => () => {
    clearInterval(interval.current);
    const myScore = SCORE[choice]; // 묵(-1) 빠(1) 찌(0)
    const cpuScore = SCORE[computerChoice(bgPosition)]; // 찌(0) 묵(-1) 빠(1)
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다.');
    } else if (diff === -1 || diff === 2) {
      setResult('이겼습니다.');
      setScore(prev => prev + 1);
    } else {
      setResult('졌습니다.');
      setScore(prev => prev - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 200);
    }, 1000);
  };
  const changeHand = () => {
    if (bgPosition === SYMBOL_POSITION.rock) {
      setBgPosition(SYMBOL_POSITION.scissors);
    } else if (bgPosition === SYMBOL_POSITION.scissors) {
      setBgPosition(SYMBOL_POSITION.paper);
    } else if (bgPosition === SYMBOL_POSITION.paper) {
      setBgPosition(SYMBOL_POSITION.rock);
    }
  };
  return (
    <>
      <div
        id='computer'
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${bgPosition} 0`,
        }}></div>
      <div>
        <button id='rock' className='btn' value='rock' onClick={onButtonClick('rock')}>
          묵
        </button>
        <button id='scissors' className='btn' value='scissors' onClick={onButtonClick('scissors')}>
          찌
        </button>
        <button id='paper' className='btn' value='paper' onClick={onButtonClick('paper')}>
          빠
        </button>
      </div>
      <div>{result}</div>
      <div>현재 점수 : {score}</div>
    </>
  );
};

export default RSP;
