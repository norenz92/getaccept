import calculate from '../src/calculate'
import {Frame, Scoreboard} from '../../types/types'

describe("Calculate", () => {

    const generateScoreboard = (pins: number) : Scoreboard => {
        return {
            frames: [1,2,3,4,5,6,7,8,9,10].map((value, i) => {
              let frame: Frame = {
                throws: i === 9 ? [pins, pins, pins] : [pins, pins]
              }
              return frame;
            }),
            score: 0
        }
    }

    it("Calculates score", () => {
    let scoreboard = generateScoreboard(2)
    expect(calculate(scoreboard).score).toBe(40);
    })

    it("Calculates all spares of 5", () => {
        let scoreboard = generateScoreboard(5)
        expect(calculate(scoreboard).score).toBe(150);
    })

    it("Calculates all strikes", () => {
        let scoreboard = generateScoreboard(10)
        expect(calculate(scoreboard).score).toBe(300);
    })

    it("All gutters", () => {
        let scoreboard = generateScoreboard(0)
        expect(calculate(scoreboard).score).toBe(0);
    })
})