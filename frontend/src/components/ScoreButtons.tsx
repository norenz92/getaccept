import React from 'react';
import {Button, ButtonGroup} from '@mui/material';

type ButtonProps = {
  onThrow: (number: number) => void;
  disabled: boolean;
}

export default function ScoreButtons({onThrow, disabled}: ButtonProps) {

  const [lastValue, setLastValue] = React.useState<number | null>(null)

  const onButtonClicked = (value: number) => {
    if (lastValue === null) {
      console.log('A')
      if (value === 10) {
        console.log('B')
        setLastValue(null)
      }
      else {
        console.log('C')
        setLastValue(value)
      }
    }
    else {
      if (lastValue + value === 10) {
        console.log('D')
        setLastValue(null)
      } else {
        console.log('E')
        setLastValue(null)
      }
    }
    
    onThrow(value)
    
  }

  const buttonDisabled = (value: number) => {
    return lastValue === null ? false : lastValue + value > 10;
  }

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
