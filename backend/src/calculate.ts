import {Scoreboard, Frame} from '../../types/types'

const calculate = (scoreboard: Scoreboard) : Scoreboard => {

    let updatedScoreboard = scoreboard;

    scoreboard.frames.forEach((frame: Frame, i: number) => {

        if (i === 0) {
            // First frame, never reference to previous frame
            if (!frameIsStrike(scoreboard.frames, i-1) && !frameIsStrike(scoreboard.frames, i-1)) scoreboard.frames[i].score = frameScore(frame)
        } 
        
        else if (i === scoreboard.frames.length-1) {
            // Last frame, special treatment

            // Check last frame

            // If last two frames were strike and first of last is strike
            if (frameIsStrike(scoreboard.frames, i-2) && frameIsStrike(scoreboard.frames, i-1) && ((frame.throws[0] ?? 0) === 10)) scoreboard.frames[i-2].score = 30;
            // if last frame is strike and first and second of last frame is strike
            if (frameIsStrike(scoreboard.frames, i-1) && ((frame.throws[0] ?? 0) === 10) && ((frame.throws[1] ?? 0) === 10)) scoreboard.frames[i-1].score = 30;
            // if last frame is strike and first of last frame is spare
            if (frameIsStrike(scoreboard.frames, i-1) && ((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10)) scoreboard.frames[i-1].score = 10 + (frame.throws[1] ?? 0);
            // if last frame is spare and first of last frame is strike
            if (frameIsSpare(scoreboard.frames, i-1) && ((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10)) scoreboard.frames[i-1].score = 20;
            // if last frame is spare and first of last frame is spare
            if (frameIsSpare(scoreboard.frames, i-1) && ((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0);


            // if all strike
            if (((frame.throws[0] ?? 0) === 10) && ((frame.throws[1] ?? 0) === 10) && ((frame.throws[2] ?? 0) === 10)) scoreboard.frames[i].score = 30;
            // if first strike and second spare
            else if (((frame.throws[0] ?? 0) === 10) && ((frame.throws[1] ?? 0) + (frame.throws[2] ?? 0) === 10)) scoreboard.frames[i].score = 20;
            // if first spare and last strike
            else if (((frame.throws[2] ?? 0) === 10) && ((frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10)) scoreboard.frames[i].score = 20;
            // if last spare
            else if (((frame.throws[0] ?? 0) < 10) && ((frame.throws[1] ?? 0) + (frame.throws[2] ?? 0) === 10)) scoreboard.frames[i].score = 10 + (frame.throws[0] ?? 0);
            // just get the frame total
            else {
              scoreboard.frames[i].score = (frame.throws[0] ?? 0) + (frame.throws[1] ?? 0)
              scoreboard.frames[i].throws[2] = undefined
            }
            
        } else {
            scoreboard.frames[i].score = frameScore(frame)
            if (i > 1 && frameIsStrike(scoreboard.frames, i-2) && (frameIsStrike(scoreboard.frames, i-1)) && frameIsStrike(scoreboard.frames, i)) scoreboard.frames[i-2].score = 30;
            else if (i > 1 && frameIsStrike(scoreboard.frames, i-2) && (frameIsStrike(scoreboard.frames, i-1)) && frameIsSpare(scoreboard.frames, i)) scoreboard.frames[i-2].score = 20 + (frame.throws[0] ?? 0);
            else if (frameIsStrike(scoreboard.frames, i-1) && frameIsSpare(scoreboard.frames, i)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0);
            else if (frameIsStrike(scoreboard.frames, i-1)) scoreboard.frames[i-1].score = 10 + frameScore(frame);
            else if (frameIsSpare(scoreboard.frames, i-1) && frameIsStrike(scoreboard.frames, i)) scoreboard.frames[i-1].score = 20;
            else if (frameIsSpare(scoreboard.frames, i-1) && frameIsSpare(scoreboard.frames, i)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0);
            else if (frameIsSpare(scoreboard.frames, i-1)) scoreboard.frames[i-1].score = 10 + (frame.throws[0] ?? 0);
            else scoreboard.frames[i].score = frameScore(frame);
        }
        
    })
    
    updatedScoreboard.score = scoreboard.frames.reduce((sum, curr) => sum + (curr.score ?? 0), 0)
    console.log(updatedScoreboard)
    return updatedScoreboard;
}

const isStrike = (frame: Frame) : boolean => (frame?.throws[0] ?? 0) === 10;
const isSpare = (frame: Frame) : boolean => (frame.throws[0] ?? 0) + (frame.throws[1] ?? 0) === 10;
const frameIsStrike = (frames: Frame[], offset: number) : boolean => isStrike(frames[offset]);
const frameIsSpare = (frames: Frame[], offset: number) : boolean => isSpare(frames[offset]);
const frameScore = (frame: Frame) : number => frame.throws.filter((item => item !== undefined)).reduce((acc: number, curr: number | undefined) : number => acc + Number(curr ?? 0), 0);

export default calculate;