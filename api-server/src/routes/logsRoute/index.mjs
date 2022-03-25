import express from 'express';

import { infoLogsRouter } from './infoLogs.mjs';
import { errorLogsRouter } from './errorLogs.mjs';

const router = express.Router();

router.use('/info', infoLogsRouter);
router.use('/error', errorLogsRouter);

export { router as logsRouter };
