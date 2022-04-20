import {Scoreboard, Frame} from '../../types/types'

const calculate = (scoreboard: Scoreboard) : Scoreboard => {

    let updatedScoreboard = scoreboard;

    scoreboard.frames.forEach((frame: Frame, i: number) => {

        
        
    })
    
    updatedScoreboard.score = scoreboard.frames.reduce((sum, curr) => sum + (curr.score ?? 0), 0)
    console.log(updatedScoreboard)
    return updatedScoreboard;
}

const isStrike = (frame: Frame) : boolean => (frame.throws[0] ?? 0) === 10;
const isSpare = (frame: Frame) : boolean => (frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10;
const lastFrameIsStrike = (frames: Frame[], currentFrameIndex: number) : boolean => {
    return isStrike(frames[currentFrameIndex-1])
}
const lastFrameIsSpare = (frames: Frame[], currentFrameIndex: number) : boolean => {
    return isSpare(frames[currentFrameIndex-1])
}
const isLastFrame = (frames: Frame[], currentFrameIndex: number) => {
    return frames.length-1 === currentFrameIndex;
}
const frameScore = (frame: Frame) : number => (frame.throws[0] ?? 0) + (frame.throws[1] ?? 0)

export default calculate;