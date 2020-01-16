import { getRepository } from 'typeorm';
import User from '../entity/User';
import Conversation from '../entity/Conversation';
import Message from '../entity/Message';

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

const seedConversations: Conversation[] = [
  {
    firstUserId: 1,
    secondUserId: 2,
  },
  {
    firstUserId: 1,
    secondUserId: 4,
  },
  {
    firstUserId: 2,
    secondUserId: 3,
  },
  {
    firstUserId: 3,
    secondUserId: 4,
  },
  {
    firstUserId: 4,
    secondUserId: 2,
  },
];

const generateSeedMessages = (): Message[] => {
  const messagesPerConvo = [3, 20, 103, 4, 2];
  const messagesToSave: Message[] = [];

  seedConversations.forEach(({ firstUserId, secondUserId }: Conversation, index: number) => {
    for (let i=0; i< messagesPerConvo[index]; i++) {
      const sender = (i % 2) ? firstUserId : secondUserId;
      const receiver = (i % 2) ? secondUserId : firstUserId;

      const message: Message = {
        senderId: sender,
        content: `Seeded message ${i + 1} from user ${sender} to user ${receiver}`,
        conversationId: index + 1,
      };

      messagesToSave.push(message);
    }
  });

  return messagesToSave;
};

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

  const messagesRepo = getRepository(Message);
  const messages = await messagesRepo.find();

  if (!messages || !messages.length) {
    console.log('seeding messages');
    const messagesToSave = generateSeedMessages();
    await messagesRepo.save(messagesToSave);
  }
};

export default seedDb;
