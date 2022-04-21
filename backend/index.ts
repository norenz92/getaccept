import express, { Express, Request, Response } from 'express';
import calculate from './src/calculate';

var cors = require('cors')

const app: Express = express();
const port = 8000;
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.post('/', (req: Request, res: Response) => {
  console.log(JSON.stringify(req.body))
  if (req.body) {
    res.json(calculate(req.body))
  } else {
    res.json({error: "error"})
  }
  
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});