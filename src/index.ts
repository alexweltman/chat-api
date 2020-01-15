import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection().then(async (connection: any) => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    const app = express();
    const port = process.env.PORT || 5000;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/hello', (req: Request, res: Response) => {
      res.send({ express: 'Hello From Express' });
    });

    app.get('/api/users', async (req: Request, res: Response) => {
      const users = await connection.manager.find(User);
      res.send(users);
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));

}).catch((error: any) => console.log(error));


