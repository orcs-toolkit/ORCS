import express from 'express';
import { Policy } from '../../models/Policy.mjs';

const router = express.Router();

router.post('/:id', async (req, res) => {
	const policy = await Policy.findById(req.params.id);

	if (!policy)
		res.status(401).send({
			message: 'Policy not found!',
		});

	policy.set({
		role: req.body.role,
		banList: req.body.banList,
	});

	await policy.save();
	res.status(201).send({
		message: 'Successfully updated policy',
		policy,
	});
});

export { router as updatePolicyRouter };
