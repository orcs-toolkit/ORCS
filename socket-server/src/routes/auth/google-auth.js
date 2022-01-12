const router = require('express').Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.get('/auth/google/test', (req, res) => {
	res.send('Success!');
});

router.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => {
		const { id, name, email } = req.user;

		const userToken = jwt.sign(
			{
				id,
				name,
				email,
			},
			String(process.env.SECRET_KEY)
		);

		req.session.user = userToken;

		res.status(201).send(req.user);
	}
);

module.exports = router;
