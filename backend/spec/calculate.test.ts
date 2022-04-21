import calculate from '../src/calculate'
import {Frame, Scoreboard} from '../../types/types'

describe("Calculate", () => {

    it("All twos", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2, undefined]
          }
        ],
        score: 0,
        maxScore: 0
      }
    expect(calculate(data).score).toBe(40);
    })

    it("Calculates all spares of 5", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [5, 5, 5]
          }
        ],
        score: 0,
        maxScore: 0
    }
        expect(calculate(data).score).toBe(150);
    })

    it("Mixed frames", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [10, 0]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [5, 5]
          },
          {
              throws: [3, 7]
          },
          {
              throws: [5, 3]
          },
          {
              throws: [1, 1]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 3, 10]
          }
        ],
        score: 0,
        maxScore: 0
      }
        expect(calculate(data).score).toBe(83);
    })

    it("All twos, last three strikes", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [2, 2]
          },
          {
              throws: [10, 10, 10]
          }
        ],
        score: 0,
        maxScore: 0
    }
      expect(calculate(data).score).toBe(66);
    })

    it("All gutters", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          },
          {
              throws: [0, 0]
          }
        ],
        score: 0,
        maxScore: 0
      }
      expect(calculate(data).score).toBe(0);
    })

    it("All strikes", () => {
      let data: Scoreboard = {
        frames: [
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 0]
          },
          {
              throws: [10, 10, 10]
          }
        ],
        score: 0,
        maxScore: 0
      }
      expect(calculate(data).score).toBe(300);
    })
})