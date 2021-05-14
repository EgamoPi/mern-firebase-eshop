const router = require('express').Router();
// Import Controllers
const {
	getAllSubcategories,
	createSubcategory,
	getSubcategory,
	updateSubcategory,
	deleteSubcategory,
} = require('../controllers/subcategoryController');
// Import Custom Middlewares
const { authCheck, adminCheck } = require('../middlewares/authMiddlewares');

// routes
router
	.route('/subcategory')
	.get(getAllSubcategories)
	.post(authCheck, adminCheck, createSubcategory);

router.get('/subcategory/:slug', getSubcategory);

// User must be logged in and user must be admin to access following routes.
router.use(authCheck, adminCheck);

router
	.route('/subcategory/:slug')
	.patch(updateSubcategory)
	.delete(deleteSubcategory);

module.exports = router;
