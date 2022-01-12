module.exports = (req, res, next) => {
	if (!req.session.auth) {
		return res.status(401).send({
			success: false,
			message: 'Please login to access this info.',
		});
	}

	next();
};
