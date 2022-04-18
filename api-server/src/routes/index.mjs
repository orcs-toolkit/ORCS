import express from 'express';
import { errorHandler } from '@ssktickets/common';

import { authRouter } from './auth/index.mjs';
import { UsersRouter } from './user/index.mjs';
import { policyRouter } from './policy/index.mjs';
import { logsRouter } from './logsRoute/index.mjs';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/api', policyRouter);
router.use('/api', UsersRouter);
router.use('/logs', logsRouter);

router.use(errorHandler);

export { router as routes };
