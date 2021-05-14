const router = require('express').Router();
// Import Controllers
const {
	createCategory,
	updateCategory,
	getAllCategories,
	getCategory,
	deleteCategory,
} = require('../controllers/categoryController');
// Import Custom Middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddlewares');

// routes
router
	.route('/category')
	.get(getAllCategories)
	.post(authCheck, adminCheck, createCategory);

router.get('/category/:slug', getCategory);

// User must be logged in and user must be admin to access following routes.
router.use(authCheck, adminCheck);

router.route('/category/:slug').patch(updateCategory).delete(deleteCategory);

module.exports = router;
