import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../entity/User';

const router = Router();

router.get('/users', async (req: Request, res: Response) => {
  const users = await getRepository(User).find();
  res.send(users);
});

router.get('/users/:id', async (req: Request, res: Response) => {
  const user = await getRepository(User).findOne(req.params.id);
  if (!user) {
    res.status(404).send({ error: 'User not found' });
    return;
  }
  res.send(user);
});

export default router;
