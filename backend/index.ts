import express, { Express, Request, Response } from 'express';
import {Bowling} from './src/Bowling';

var cors = require('cors')

let bowling: Bowling;

const app: Express = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', (req: Request, res: Response) => {
  bowling = new Bowling();
  if (req.body) {
    let updatedScoreboard = bowling.getScore2(req.body.throws)
    console.log('throws', updatedScoreboard.throws)
    console.log('score', updatedScoreboard.score)
    
    res.json({throws: updatedScoreboard.throws, score: updatedScoreboard.score ? updatedScoreboard.score : 0});
  } else {
    res.json({error: "error"})
  }
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});