import express from 'express';
import { Logs } from '../../models/Logs.mjs';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const machineLogs = await Logs.find({});
		res.send(machineLogs);
	} catch (e) {
		logger.error(e.message);
	}
});

export { router as logsRouter };
