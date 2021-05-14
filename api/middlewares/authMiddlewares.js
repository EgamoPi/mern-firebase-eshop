const admin = require('../firebase');
const User = require('../models/userModel');

// Custom middleware to check if user is logged in & retrieve his data to send it back to the frontend
exports.authCheck = async (req, res, next) => {
	try {
		// 1) We verify if from firebase api the validity of the token
		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);

		// 2) assign to the request object the result from firebase api
		req.user = firebaseUser;

		// 3) !!! next() to not block the event loop !!!
		next();
	} catch (error) {
		console.log(error);
		res.status(401).json({
			err: error,
		});
	}
};

// Custom middleware to check if user is an admin in order to protect admin routes
exports.adminCheck = async (req, res, next) => {
	try {
		// 1) We retrieve the current user email from request object & find him/her in MongoDb
		const { email } = req.user;
		const adminUser = await User.findOne({ email }).exec();

		// 2) If user is admin go to next() middleware, if not send to frontent that user can't access a certain resource
		if (adminUser.role !== 'admin') {
			res.status(403).json({
				status: 'Not authorized. Admin Resource',
			});
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
	}
};
