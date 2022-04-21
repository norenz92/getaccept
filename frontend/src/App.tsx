import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container} from '@mui/material';
import { ScoreboardView } from './components/ScoreboardView';

function App() {
  return (
    <Container maxWidth="xl">
      <ScoreboardView/>
    </Container>
  );
}

export default App;
