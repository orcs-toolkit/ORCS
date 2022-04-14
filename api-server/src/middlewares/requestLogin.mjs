export const requestLogin = (req, res, next) => {
	var header = req.headers.authorization || '';
	var token = header.split(/\s+/).pop() || '';
	if (!header && !token) {
		return res.status(401).send({
			success: false,
			message: 'Please login to access this info.',
		});
	}

	next();
};
