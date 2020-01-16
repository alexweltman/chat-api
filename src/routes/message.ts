import { Router, Request, Response } from 'express';
import { getRepository, Brackets } from 'typeorm';
import moment from 'moment';

import Message from '../entity/Message';
import Conversation from '../entity/Conversation';
import validateBody from '../validation/validation';

const router = Router();

const getMessagesQuery = () => {
  const thirtyDaysAgo = moment().subtract(30,'d');

  return getRepository(Message)
    .createQueryBuilder('message')
    .where('message.createdDate > :thirtyDaysAgo', { thirtyDaysAgo })
    .limit(100)
    .orderBy('message.createdDate', 'DESC')
};

router.get('/messages', async (req: Request, res: Response) => {
  const { toUser, fromUser } = req.query;

  const query = getMessagesQuery();

  if (toUser) {
    query
      .leftJoin('conversations', 'conversation', 'conversation.id = message.conversationId')
      .andWhere('message.senderId != :toUser', { toUser})
      .andWhere(new Brackets(qb => {
        qb.where('conversation.firstUserId = :toUser', { toUser})
          .orWhere('conversation.secondUserId = :toUser', { toUser })
      }))
  }

  if (fromUser) {
    query.andWhere('message.senderId = :fromUser', { fromUser });
  }

  const messages = await query.getMany();

  res.send(messages);
});

router.get('/messages/:conversationId', async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;

  const messages = await getMessagesQuery()
    .andWhere('message.conversationId = :conversationId', { conversationId })
    .getMany();

  res.send(messages);
});

router.post('/messages/:conversationId', async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId;

  const convoRepo = getRepository(Conversation);
  const conversation = await convoRepo.findOne(conversationId);

  if (!conversation) {
    res.status(400).send({ error: 'Invalid conversationID provided' });
  }

  const message = req.body;

  try {
    validateBody(message);
  } catch ({ message: error }) {
    res.status(400).send({ error });
  }

  if ((conversation?.firstUserId !== message.senderId)
   && (conversation?.secondUserId !== message.senderId)) {
    res.status(400).send({ error: `user ${message.senderId} is not in conversation ${conversationId}` });
   }

  const messageRepo = getRepository(Message);
  message.conversationId = conversationId;
  const savedMessage = await messageRepo.save(message)

  res.send(savedMessage);
});

export default router;
