import { getRepository } from 'typeorm';
import User from '../entity/User';
import Conversation from '../entity/Conversation';

const seedUsers: User[] = [
  {
    id: 1,
    firstName: 'Bob',
    lastName: 'Smith',
  },
  {
    id: 2,
    firstName: 'Liz',
    lastName: 'Jones',
  },
  {
    id: 3,
    firstName: 'Sam',
    lastName: 'Scott',
  },
  {
    id: 4,
    firstName: 'Rachel',
    lastName: 'Jenkins',
  },
];

const seedConversations: any[] = [
  {
    firstUser: 1,
    secondUser: 2,
  },
  {
    firstUser: 1,
    secondUser: 4,
  },
  {
    firstUser: 2,
    secondUser: 3,
  },
  {
    firstUser: 3,
    secondUser: 4,
  },
  {
    firstUser: 4,
    secondUser: 2,
  },
];

const seedDb = async () => {
  const userRepo = getRepository(User);
  const users = await userRepo.find();

  if (!users || !users.length) {
    console.log('seeding users');
    await userRepo.save(seedUsers);
  }

  const conversationRepo = getRepository(Conversation);
  const convos = await conversationRepo.find();

  if (!convos || !convos.length) {
    console.log('seeding conversations');
    await conversationRepo.save(seedConversations);
  }
};

export default seedDb;
