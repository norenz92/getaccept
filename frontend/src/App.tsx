import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from '@mui/material';
import { ScoreboardView } from './components/ScoreboardView';
import {Frame, Scoreboard} from '../../types/types';

const initialScoreboard = {
  frames: [1,2,3,4,5,6,7,8,9,10].map((value, i) => {
    let frame: Frame = {
      throws: value === 10 ? [undefined, undefined, undefined] : [undefined, undefined]
    }
    return frame;
  }),
  score: 0
}

function App() {

  const [scoreboard, setScoreBoard] = useState<Scoreboard>(initialScoreboard)

  const calculateScore = (scoreboard: Scoreboard) : void => {
    console.log(scoreboard)
  }

  return (
    <Container maxWidth="xl">
      <ScoreboardView scoreboard={scoreboard} onChange={calculateScore}/>
    </Container>
  );
}

export default App;
