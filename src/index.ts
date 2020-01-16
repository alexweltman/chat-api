import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";

import routes from './routes/';
import seedDb from './seed/seed';

createConnection().then(async (connection: Connection) => {
  await seedDb();
  const app = express();
  const port = process.env.PORT || 5000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(routes);

  app.listen(port, () => console.log(`Listening on port ${port}`));

}).catch((error: any) => console.log(error));


