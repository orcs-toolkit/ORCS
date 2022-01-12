const router = require('express').Router();
const requestLogin = require('../../middlewares/requestLogin');

router.get('/api/test', requestLogin, async (req, res) => {
	res.send('Hello!');
});

module.exports = router;
