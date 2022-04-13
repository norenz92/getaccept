import React from 'react';

type Props = {
  children: JSX.Element[],
};

export const ScoreboardView = ({children} : Props) => {
  
  return (
    <div>
      <h1>Bowling Scoreboard</h1>
      <div>
        {children}
      </div>
    </div>
  )
}
