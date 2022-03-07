import express from 'express';
import { errorHandler } from '@ssktickets/common';

import { authRouter } from './auth/index.mjs';

const router = express.Router();

router.use('/auth', authRouter);

router.use(errorHandler);

export { router as routes };
