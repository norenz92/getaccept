import React from 'react';
import {Button, ButtonGroup} from '@mui/material';

type ButtonProps = {
  value: number;
  disabled: boolean;
  onClick: (number: number) => number | void;
}

type ButtonsProps = {
  onThrow?: (number: number) => void;
}

type Frame = {
  first: string | number;
  second: string | number;
}

export default function ScoreButtons({onThrow}: ButtonsProps) {

  const [lastValue, setLastValue] = React.useState<number | null>(null)
  const [scores, setScores] = React.useState<Frame[]>([])

  const onButtonClicked = (value: number) => {
    if (lastValue === null) {
      if (value === 10) {
        // We got a strike!
        console.log(`Strike!`)
        setScores([...scores, {first: "", second: "/"}])
      }
      else if (value < 10) {
        setLastValue(value)
      }
      else {
        setLastValue(null)
      }
    }
    else {
      if (lastValue + value === 10) {
        // We got a spare!
        console.log(`Spare (${lastValue} + ${value})`)
        setScores([...scores, {first: lastValue, second: "/"}])
        setLastValue(null)
      } else {
        console.log(`Score (${lastValue} + ${value})`)
        setScores([...scores, {first: lastValue, second: value}])
        setLastValue(null)
      }
    }
    if (onThrow) {
      onThrow(value)
    }
  }

  const buttonDisabled = (value: number) => {
    return lastValue === null ? false : lastValue + value > 10;
  }

  /* const Button = ({value, disabled, onClick}: ButtonProps) => {
    return (
      <button id="scoreButton" disabled={buttonDisabled(value)} key={value} onClick={() => onButtonClicked(value)}>{value}</button>
    )
  } */

  const Buttons = () => {
    return (
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {
        Array.from(Array(11), (e, i) => {
          return <Button disabled={buttonDisabled(i)} key={i} onClick={() => onButtonClicked(i)}>{i}</Button>
        })}
      </ButtonGroup>
    )
  }

  return (
    <div>
      <Buttons/>
    </div>
  )
}
