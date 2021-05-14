const User = require('../models/userModel');

// Controller to create or update a firebase user into MongoDb
exports.createOrUpdateUser = async (req, res) => {
	try {
		// 1) Retrieve firebase user data & 'try' to find and update (because the firebase email maybe changed etc etc...) him/her in MongoDB
		const { name, picture, email } = req.user;
		const user = await User.findOneAndUpdate(
			{ email },
			{ name: email.split('@')[0], picture },
			{ new: true }
		);

		// 2) If user does not exist in MongoDb, create him/her
		if (!user) {
			const newUser = await new User({
				email,
				name: email.split('@')[0],
				picture,
			}).save();
			// 3a) Send response to frontend if it's a new user
			res.status(201).json(newUser);
		} else {
			// 3b) Send response to frontend if it's an updated user
			res.status(200).json(user);
		}
	} catch (error) {
		console.error(error);
	}
};

// Controller to retrieve current logged in user from MongoDb
exports.currentUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.user.email });
		if (!user) throw new Error('no user was found with that email');
		res.status(200).json(user);
	} catch (error) {
		console.log(error);
	}
};
