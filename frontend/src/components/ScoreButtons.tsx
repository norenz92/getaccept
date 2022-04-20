import React from 'react';
import {Button, ButtonGroup} from '@mui/material';

type ButtonProps = {
  onThrow?: (number: number) => void;
  disabled: boolean;
}

type Frame = {
  first: string | number;
  second: string | number;
}

export default function ScoreButtons({onThrow, disabled}: ButtonProps) {

  const [lastValue, setLastValue] = React.useState<number | null>(null)

  const onButtonClicked = (value: number) => {
    if (lastValue === null) {
      if (value === 10) {
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
        setLastValue(null)
      } else {
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
          return <Button disabled={buttonDisabled(i) || disabled} key={i} onClick={() => onButtonClicked(i)}>{i}</Button>
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
