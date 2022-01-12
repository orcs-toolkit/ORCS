const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { ValidateRequest } = require('@ssktickets/common');
const { User } = require('../../models/JwtUser');
const { Password } = require('../../services/password');
const { rateLimiter } = require('../../middlewares/redisRateLimiter');

router.post(
	'/api/auth/login',
	[
		body('email').isEmail().withMessage('Email must be valid!'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a password!'),
	],
	ValidateRequest,
	rateLimiter,
	async (req, res) => {
		const { email, password } = req.body;
		console.log(email, password);

		const user = await User.findOne({ email });

		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Invalid Credentials' });

		const validPassword = await Password.compare(user.password, password);

		if (!validPassword)
			return res
				.status(400)
				.json({ success: false, message: 'Invalid Credentials.' });

		// Create and assign token
		const userToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			String(process.env.SECRET_KEY)
		);

		// Store it on session object
		req.session.user = userToken;

		return res.json({
			success: true,
			message: `Successfully logged in user: ${user.email}`,
		});
	}
);

module.exports = router;
