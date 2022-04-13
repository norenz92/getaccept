import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Scoreboard } from './types/Scoreboard';
import ScoreButtons from './components/ScoreButtons';

function App() {

  const [scoreboard, setScoreboard] = React.useState<Scoreboard>({
    throws: [],
    score: 0
  });

  const addThrow = async (pins: number) => {
    let test: number[] = [];
    test.concat(scoreboard.throws)
    test.push(5)
    test.push(4)
    test.push(2)
    console.log(test)
    let res = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(test)
    })
    if (res.ok) {
      let scoreboard = await res.json()
      console.log(scoreboard)
      setScoreboard(scoreboard);
    } else {
      console.log('Error')
    }
  }

  return (
    <div id="container">
      <button onClick={() => addThrow(10)}>Test</button>
      <ScoreButtons/>
    </div>
  );
}

export default App;
