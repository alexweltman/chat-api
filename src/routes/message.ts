import { Router, Request, Response } from 'express';
import { getRepository, Brackets } from 'typeorm';
import moment from 'moment';

import Message from '../entity/Message';

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



export default router;
