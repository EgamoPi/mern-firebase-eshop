const router = require('express').Router();

// Controllers
const { getAllUser } = require('../controllers/userController');

router.route('/').get(getAllUser);

module.exports = router;
