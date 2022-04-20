import {Scoreboard, Frame} from '../../types/types'

const calculate = (scoreboard: Scoreboard) : Scoreboard => {

    let updatedScoreboard = scoreboard;

    scoreboard.frames.forEach((frame: Frame, i: number) => {

        if (i === 0) {
            // First frame, never reference to frame before
            if (!isStrike(frame) && !isSpare(frame)) scoreboard.frames[i].score = frameScore(frame)
        } else if (i === 9) {
            // Last frame, special treatment
            scoreboard.frames[i].score = frameScore(frame)
            if (lastFrameIsStrike(scoreboard.frames, i-1) && (lastFrameIsStrike(scoreboard.frames, i)) && isStrike(frame)) scoreboard.frames[i-1].score = 30;
            else if (lastFrameIsStrike(scoreboard.frames, i) && isStrike(frame)) scoreboard.frames[i-1].score = 10 + frameScore(frame)
            else if (lastFrameIsStrike(scoreboard.frames, i) && isSpare(frame)) scoreboard.frames[i-1].score = 10 + frameScore(frame)
            else if (lastFrameIsSpare(scoreboard.frames, i) && isStrike(frame)) scoreboard.frames[i-1].score = 20
            else if (lastFrameIsSpare(scoreboard.frames, i) && isSpare(frame)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0)
            else if (lastFrameIsSpare(scoreboard.frames, i) && !isStrike(frame) && !isSpare(frame)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0)
            else scoreboard.frames[i].score = frameScore(frame)
            if (isStrike(frame)) {
                scoreboard.frames[i].score = (scoreboard.frames[i].score ?? 0) + (frame.throws[2] ?? 0)
            }
            else if (isSpare(frame)) {
                scoreboard.frames[i].score = (scoreboard.frames[i].score ?? 0) + (frame.throws[1] ?? 0)
            }
            else {
                
            }
            
        } else {
            scoreboard.frames[i].score = frameScore(frame)
            if (i > 1 && lastFrameIsStrike(scoreboard.frames, i-1) && (lastFrameIsStrike(scoreboard.frames, i)) && isStrike(frame)) scoreboard.frames[i-1].score = 30;
            else if (lastFrameIsStrike(scoreboard.frames, i) && isStrike(frame)) scoreboard.frames[i-1].score = 10 + frameScore(frame)
            else if (lastFrameIsStrike(scoreboard.frames, i) && isSpare(frame)) scoreboard.frames[i-1].score = 10 + frameScore(frame)
            else if (lastFrameIsSpare(scoreboard.frames, i) && isSpare(frame)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0)
            else if (lastFrameIsSpare(scoreboard.frames, i) && !isStrike(frame) && !isSpare(frame)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0)
            else scoreboard.frames[i].score = frameScore(frame)
        }
        
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