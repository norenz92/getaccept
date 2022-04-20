import {Bowling} from '../src/Bowling'

describe("Bowling", () => {

  let bowling: Bowling;

  beforeEach(() => {
    bowling = new Bowling();
  });

  let addThrows = (pins: number, times: number) => {
    for (let i = 0; i < times; i++) {
      bowling.addThrow(pins);
    }
  }

  it("all missed", () => {
    addThrows(0, 20)
    expect(bowling.getScore()).toBe(0);
  })

  it("all threes", () => {
    addThrows(3, 20)
    expect(bowling.getScore()).toBe(60);
  })

  it("spare and rest misses", () => {
    addThrows(5, 2)
    addThrows(0, 18)
    expect(bowling.getScore()).toBe(10);
  })

  it("spare and rest threes", () => {
    addThrows(5, 2)
    addThrows(3, 18)
    expect(bowling.getScore()).toBe(67);
  })

  it("strike and rest threes", () => {
    addThrows(10, 1)
    addThrows(3, 18)
    expect(bowling.getScore()).toBe(70);
  })

  it("Mixed throws", () => {
    addThrows(10, 1)
    addThrows(4, 2)
    addThrows(5, 1)
    addThrows(3, 1)
    addThrows(2, 1)
    addThrows(8, 1)
    addThrows(2, 1)
    addThrows(0, 1)
    addThrows(3, 1)
    expect(bowling.getScore()).toBe(48);
  })

  it("One throw", () => {
    addThrows(5, 1)
    expect(bowling.getScore()).toBe(5);
  })

  it("all strikes", () => {
    addThrows(10, 12)
    expect(bowling.getScore()).toBe(300);
  })
})