import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {Bowling} from './src/Bowling';

var cors = require('cors')

dotenv.config();

let bowling: Bowling;

const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', (req: Request, res: Response) => {
  bowling = new Bowling();
  if (req.body) {
    let score = bowling.getScore2(req.body)
    console.log('Got ' + req.body + ' = ' + score.score)
    
    res.json(score);
  } else {
    res.json({error: "error"})
  }
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});