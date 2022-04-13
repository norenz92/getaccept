import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';

type Props = {
  throws: number[]
}

type FrameProps = {
  frameNumber: number;
  firstValue?: number;
  secondValue?: number;
  score?: number;
}

export const Frames = ({throws} : Props) => {

  const [currentThrows, setCurrentThrows] = useState<number[]>([])
  const [currentFrame, setCurrentFrame] = useState<number>(0)

  useEffect(() => {
    let index = Math.ceil(currentThrows.length/2 * 1)/1
    console.log(index)
  }, [currentThrows])

  const Frame = ({frameNumber, firstValue, secondValue, score} : FrameProps) : JSX.Element => {
    return (
      <Grid item>
        <Paper
          sx={{
            height: 'auto',
            width: 100,
            flex: 1,
            textAlign: 'center',
            backgroundColor: 'black',
            color: 'white'
          }}
        >
          <div style={{padding: 5}}>
          <p>Frame {frameNumber}</p>
        </div>
        
      </Paper>
      <Paper
        sx={{
          height: 90,
          width: 100,
          flex: 1,
          textAlign: 'center',
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >
        <Grid container height={40}>
          <Grid item md={6}>
            <h3>{firstValue}</h3>
          </Grid>
          <Grid item md={6} style={{borderBottomWidth: 2, borderBottomColor: 'black', borderBottomStyle: 'solid', borderLeftWidth: 2, borderLeftColor: 'black', borderLeftStyle: 'solid'}}>
            <h3>{secondValue}</h3>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <h2>{score}</h2>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    )
  }

  useEffect(() => {
    console.log('Frames: ' + throws)
    setCurrentThrows([...throws])
  }, [throws])

  const GenerateFrames = () : JSX.Element[] => {

    let elements: JSX.Element[] = [];

    currentThrows.map((value, i) => {
      elements.push(<Frame frameNumber={i} firstValue={value}/>)
    })

    for (let i=elements.length; i < 10; i++) {
      elements.push(<Frame frameNumber={i}/>)
    }

    return (elements);
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2} style={{marginTop: 10}}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          {GenerateFrames()}
        </Grid>
      </Grid>
    </Grid>
  )
}
