import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Scoreboard, Frame} from '../../../types/types';
import ScoreButtons from './ScoreButtons';

interface FrameProps {
  frame: Frame;
  index: number;
}

interface ScoreboardProps {
  scoreboard: Scoreboard;
  onChange(scoreboard: Scoreboard): void;
}

export const ScoreboardView = ({scoreboard, onChange} : ScoreboardProps) => {

  const [currentFrame, setCurrentFrame] = useState<number>(0)

  const newThrow = (value: number) : void => {
    let updatedScoreboard = {...scoreboard}
    console.log(value)

    if (updatedScoreboard.frames[currentFrame].throws[0] === undefined) {
      if (value === 10) {
        updatedScoreboard.frames[currentFrame].throws[0] = value;
        updatedScoreboard.frames[currentFrame].throws[1] = 0;
        setCurrentFrame(currentFrame + 1)
      } else {
        updatedScoreboard.frames[currentFrame].throws[0] = value;
      }
    } else {
      updatedScoreboard.frames[currentFrame].throws[1] = value;
      setCurrentFrame(currentFrame + 1)
    }
    onChange(updatedScoreboard)
  }

  const Frame = ({frame, index} : FrameProps) : JSX.Element => {

    const transformValues = (value: number | undefined, index: number) : string | number | undefined => {
      if (index === 0) {
        // we are checking first part of frame
        if (value === 10) {
          return '';
        } else {
          return value
        }
      }
      if ((index === 1) && (value !== undefined)) {
        if (value === 10) {
          return 'X'
        } else if (frame.throws[0] !== undefined) {
          if (frame.throws[0] === 10) {
            return 'X'
          }
          if (value + frame.throws[0] === 10) {
            return '/'
          } else {
            return value;
          }
        } else {
          return value
        }
      } else {
        return ''
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
            <span style={{fontSize: 24, fontWeight: '700'}}>{transformValues(frame.throws[1], 1)}</span>
            </Grid>
          }
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <span style={{fontSize: 24, fontWeight: '700'}}>{frame.score}</span>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
    )
  }

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={1} style={{marginTop: 10}}>
      <h1>Bowling</h1>
      <Grid item>
        
        <Grid container justifyContent="center" spacing={1}>
          <Grid item xs={12}>
            <ScoreButtons onThrow={newThrow} disabled={scoreboard.frames[9].throws[1] !== undefined}/>
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
              <Grid container height={40}>
                <Grid item md={6}>
                  <h3>{}</h3>
                </Grid>
                <Grid item md={6} style={{borderBottomWidth: 2, borderBottomColor: 'black', borderBottomStyle: 'solid', borderLeftWidth: 2, borderLeftColor: 'black', borderLeftStyle: 'solid'}}>
                  <h3>{}</h3>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={12}>
                  <h2>{}</h2>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
