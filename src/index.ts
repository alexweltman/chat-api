import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/hello2', (req: Request, res: Response) => {
  res.send({ express: 'Hello From Express 2' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
