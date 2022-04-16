import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', async (req, res) => {
	var header = req.headers.authorization || '';
	var token = header.split(/\s+/).pop() || '';
	// console.log(`Header: ${header}, Token: ${token}`);

	if (!header) return res.status(400).send({ currentUser: null });

	const payload = jwt.verify(token, String(process.env.SECRET_KEY));

	var date = new Date(payload.iat * 1000);
	// Hours part from the timestamp
	var hours = date.getHours();
	// Minutes part from the timestamp
	var minutes = '0' + date.getMinutes();
	// Seconds part from the timestamp
	var seconds = '0' + date.getSeconds();

	// Will display time in 10:30:23 format
	var formattedTime =
		hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
	res.status(200).send({
		currentUser: {
			id: payload.id,
			email: payload.email,
			name: payload.name,
			admin: payload.isAdmin,
			issued_at:
				new Date(1650127251 * 1000).toDateString() +
				' ' +
				new Date(1650127251 * 1000).toLocaleTimeString(),
		},
	});
});

export { router as currentuserRouter };
