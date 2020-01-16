import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Conversation from '../entity/Conversation';

const router = Router();

router.get('/conversations', async (req: Request, res: Response) => {
  const convos = await getRepository(Conversation).find();
  console.log(convos[0].firstUser);
  res.send(convos);
});

router.get('/conversations/:id', async (req: Request, res: Response) => {
  const convo = await getRepository(Conversation).findOne(req.params.id);
  if (!convo) {
    res.status(404).send({ error: 'Conversation not found' });
    return;
  }
  res.send(convo);
});

export default router;
