const router = require('express').Router();

router.get('/api/auth/logout', (req, res) => {
	req.session.destroy(function (err) {
		res.send({
			success: true,
			message: 'Successfully logged out.',
			error: err,
		});
	});
	req.logOut();
});

module.exports = router;
