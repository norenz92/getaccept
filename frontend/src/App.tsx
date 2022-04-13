import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Scoreboard } from './types/Scoreboard';
import ScoreButtons from './components/ScoreButtons';
import { ScoreboardView } from './components/ScoreboardView';
import {Container} from '@mui/material';
import { Frames } from './components/Frames';

function App() {

  const [scoreboard, setScoreboard] = React.useState<Scoreboard>({
    throws: [],
    score: 0
  });

  const calculateScore = async (newScoreboard: Scoreboard) : Promise<void> => {
    let res = await fetch('http://localhost:8000/', {
      method: 'POST',
      body: JSON.stringify(newScoreboard),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (res.ok) {
      await res.json().then((newScoreboard: Scoreboard) => {
        console.log(newScoreboard)
      })
    } else {
      console.log('Error')
    }
  }

  const addThrow = (value: number) => {
    let newScoreboard: Scoreboard = {...scoreboard};
    newScoreboard.throws.push(value)
    calculateScore(newScoreboard)
  }

  return (
    <Container maxWidth="lg">
      <ScoreboardView>
        <ScoreButtons onThrow={(value) => addThrow(value)}/>
        <Frames throws={scoreboard.throws}/>
      </ScoreboardView>
    </Container>
  );
}

export default App;
