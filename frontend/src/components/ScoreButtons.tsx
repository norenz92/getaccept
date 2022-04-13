import React from 'react'

export default function ScoreButtons() {

  const Buttons = () => {
    return (
      <div>
        {
        Array.from(Array(11), (e, i) => {
          return <button id="scoreButton" key={i}>{i}</button>
        })}
      </div>
    )
  }

  return (
    <div>
      <Buttons/>
    </div>
  )
}
