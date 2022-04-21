import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Scoreboard, Frame} from '../../../types/types';
import ScoreButtons from './ScoreButtons';


interface FrameProps {
  frame: Frame;
  index: number;
}

const initialScoreboard = {
  frames: [1,2,3,4,5,6,7,8,9,10].map((value, i) => {
    let frame: Frame = {
      throws: value === 10 ? [undefined, undefined, undefined] : [undefined, undefined]
    }
    return frame;
  }),
  score: 0,
  maxScore: 0
}

export const ScoreboardView = () => {

  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [scoreboard, setScoreboard] = useState<Scoreboard>(initialScoreboard);
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(false);

  useEffect(() => {
    console.log('currentFrame updated: ' + currentFrame)
  }, [currentFrame])

  useEffect(() => {
    console.log('Score recieved')
    console.log('scoreboard', scoreboard)
  }, [scoreboard])

  const calculateScore = async (scoreboard: Scoreboard) : Promise<void> => {
    try {
      let data: Scoreboard = await fetch('http://localhost:8000', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(scoreboard)
      }).then(res => res.json())
      setScoreboard(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log('Rerender')
  })

  const onThrow = (value: number) : void => {
    console.log(value + ' clicked')
    console.log('Run onThrow')
    let updatedScoreboard = {...scoreboard}
    console.log('updatedScoreboard', updatedScoreboard)

    if (currentFrame === 9) {
      if (value === 10) {
        if ((updatedScoreboard.frames[currentFrame].throws[0] === undefined) || (updatedScoreboard.frames[currentFrame].throws[0] === null)) {
          updatedScoreboard.frames[currentFrame].throws[0] = value;
        }
        else if ((updatedScoreboard.frames[currentFrame].throws[1] === undefined) || (updatedScoreboard.frames[currentFrame].throws[1] === null)) {
          updatedScoreboard.frames[currentFrame].throws[1] = value;
        }
        else if ((updatedScoreboard.frames[currentFrame].throws[2] === undefined) || (updatedScoreboard.frames[currentFrame].throws[2] === null)) {
          updatedScoreboard.frames[currentFrame].throws[2] = value;
          setButtonsDisabled(true)
        }
      } else {
        if ((updatedScoreboard.frames[currentFrame].throws[0] === undefined) || (updatedScoreboard.frames[currentFrame].throws[0] === null)) {
          updatedScoreboard.frames[currentFrame].throws[0] = value;
        }
        else if ((updatedScoreboard.frames[currentFrame].throws[1] === undefined) || (updatedScoreboard.frames[currentFrame].throws[1] === null)) {
          updatedScoreboard.frames[currentFrame].throws[1] = value;
          if (updatedScoreboard.frames[currentFrame].throws[0] !== 10 && ((updatedScoreboard.frames[currentFrame].throws[0] ?? 0) + (updatedScoreboard.frames[currentFrame].throws[1] ?? 0) !== 10)) setButtonsDisabled(true)
        }
        else if ((updatedScoreboard.frames[currentFrame].throws[2] === undefined) || (updatedScoreboard.frames[currentFrame].throws[2] === null)) {
          updatedScoreboard.frames[currentFrame].throws[2] = value;
          setButtonsDisabled(true)
        }
      }
    } 
    else if ((updatedScoreboard.frames[currentFrame].throws[0] === undefined) || (updatedScoreboard.frames[currentFrame].throws[0] === null)) {
      console.log('AA')
      
      if (value === 10) {
        console.log('BB')
        updatedScoreboard.frames[currentFrame].throws[0] = value;
        updatedScoreboard.frames[currentFrame].throws[1] = 0;
        setCurrentFrame(currentFrame + 1)
      } else {
        console.log('CC')
        updatedScoreboard.frames[currentFrame].throws[0] = value;
        }
    } else {
      console.log('DD')
      updatedScoreboard.frames[currentFrame].throws[1] = value;
      setCurrentFrame(currentFrame + 1)
    }
    console.log('EE')
    calculateScore({...updatedScoreboard})
    
  }

  const Frame = ({frame, index} : FrameProps) : JSX.Element => {

    const transformValues = (value: number | undefined, index: number) : string | number | undefined => {
      console.log(value, index)
      if (index === 0) {
        // we are checking the first part of frame
        if (frame.throws.length === 3) {
          if (value === 10) {
            return 'X'
          }
          else if ((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10) {
            return value
          }
          else if ((value ?? 0) + (frame.throws[1] ?? 0) === 10) {
            return '/'
          } else {
            return value;
          }
        }
        else {
          if (value === 10) {
            return '';
          } else {
            return value
          }
        }
      }
      else if ((index === 1) && (value !== undefined)) {
        if (frame.throws.length === 3) {
          if (value === 10) {
            return 'X'
          }
          else if (((frame.throws[0] ?? 0) !== 10) && (frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10) {
            return '/'
          } else {
            return value;
          }
        }
        else if (frame.throws[1] !== undefined) {
          if (frame.throws[0] === 10) {
            return 'X'
          }
          else if (value + (frame.throws[0] ?? 0) === 10) {
            return '/'
          } else {
            return value;
          }
        } else {
          return value
        }
      }
      else if (index === 2) {
        if (frame.throws.length === 3) {
          if (value === 10) {
            return 'X'
          }
          else if (((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) !== 10) && ((frame.throws[1] ?? 0) + (frame.throws[2] ?? 0) !== 10) && ((frame.throws[2] !== undefined) || (frame.throws[2] !== null))) {
            return '/'
          } else {
            return value;
          }
        } 
        else if (frame.throws[1] !== undefined) {
          if (frame.throws[1] === 10) {
            return 'X'
          }
          else if ((frame.throws[0] ?? 0) + frame.throws[1] === 10) {
            return value
          }
          else if ((value ?? 0) + frame.throws[1] === 10) {
            return '/'
          } else {
            return value;
          }
          
        } else {
          return value
        }
      } else {
        return value
      }
    }

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
          <span style={{fontSize: 20}}>{index+1}</span>
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
          <Grid item md={index === 9 ? 4 : 6}>
            <span style={{fontSize: 24, fontWeight: '700'}}>{transformValues(frame.throws[0], 0)}</span>
          </Grid>
          <Grid item md={index === 9 ? 4 : 6} style={{borderBottomWidth: 2, borderBottomColor: 'black', borderBottomStyle: 'solid', borderLeftWidth: 2, borderLeftColor: 'black', borderLeftStyle: 'solid'}}>
          <span style={{fontSize: 24, fontWeight: '700'}}>{transformValues(frame.throws[1], 1)}</span>
          </Grid>
          { index === 9 &&
            <Grid item md={4} style={{borderBottomWidth: 2, borderBottomColor: 'black', borderBottomStyle: 'solid', borderLeftWidth: 2, borderLeftColor: 'black', borderLeftStyle: 'solid'}}>
            <span style={{fontSize: 24, fontWeight: '700'}}>{transformValues(frame.throws[2], 2)}</span>
            </Grid>
          }
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <span style={{fontSize: 24, fontWeight: '700'}}>{frame.score === 0 ? '' : frame.score}</span>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    )
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={1} style={{marginTop: 10}}>
      <h1>Bowling Calculator</h1>
      <Grid item>
        
        <Grid container justifyContent="stretch" spacing={1}>
          <Grid item xs={12}>
            <ScoreButtons onThrow={onThrow} disabled={buttonsDisabled}/>
          </Grid>
          {
            scoreboard.frames.map((frame: Frame, i: number) => (
              <Frame frame={frame} index={i}/>
            ))
          }
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
                <span style={{fontSize: 20}}>Score</span>
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
              <Grid container>
                <Grid item md={12}>
                  <h2>{scoreboard.score}</h2>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
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
                <span style={{fontSize: 20}}>Max</span>
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
              <Grid container>
                <Grid item md={12}>
                  <h2></h2>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
