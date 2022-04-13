
interface Scoreboard {
  throws: number[];
  score: number;
}

export class Bowling {

  private throws: Array<number> = [];

  public addThrow(pins: number) : void {
    this.throws.push(pins)
  }

  public getScore(): number {

    let score: number = 0;
    let frameCount: number = Math.ceil(this.throws.length/2 * 1)/1
    
    console.log("----------------------")

    // Run a loop
    for (let frameIndex = 0, throwIndex = 0; frameIndex < frameCount; frameIndex++) {
      
      score += this.throws[throwIndex];
      score += this.throws[throwIndex + 1];

      // Check if we got a spare
      if (this.isSpare(throwIndex) || this.isStrike(throwIndex)) {
        score += this.throws[throwIndex + 2]
        if (this.isStrike(throwIndex+1)) {
          score += this.throws[throwIndex + 2]
          score += this.throws[throwIndex + 3]
        }
      }

      // Check if we got a strike
      if (this.isStrike(throwIndex)) {
        throwIndex++;
      } else {
        throwIndex += 2
      }
    }

    return score;
  }

  public getScore2(throwHistory: number[]) : Scoreboard {

    throwHistory.forEach(value => {
      this.throws.push(value)
    })
    return {
      throws: this.throws,
      score: this.getScore()
    }
  }

  private isSpare(throwIndex: number) : boolean {
    return this.throws[throwIndex] + this.throws[throwIndex + 1] === 10
  }

  private isStrike(throwIndex: number) : boolean {
    return this.throws[throwIndex] === 10;
  }

}