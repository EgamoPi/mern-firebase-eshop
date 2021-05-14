const router = require('express').Router();
// Import Controllers
const {
	createOrUpdateUser,
	currentUser,
} = require('../controllers/authController');
// Import Custom Middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddlewares');

router.route('/create-or-update-user').post(authCheck, createOrUpdateUser);
router.route('/current-user').post(authCheck, currentUser);
router.route('/current-admin').post(authCheck, adminCheck, currentUser);

module.exports = router;
