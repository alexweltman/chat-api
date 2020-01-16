import { Router} from 'express';

import userRoutes from './user';
import convoRoutes from './conversation';
import messageRoutes from './message';

const router = Router();
router.use(userRoutes);
router.use(convoRoutes);
router.use(messageRoutes);

export default router;


