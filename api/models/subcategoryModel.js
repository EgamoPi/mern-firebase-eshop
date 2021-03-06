const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subcategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: [true, 'A category needs a name'],
			minlength: [3, 'Too short'],
			maxlength: [32, 'Too long'],
		},
		slug: {
			type: String,
			unique: true,
			lowercase: true,
			index: true,
		},
		parent: {
			type: ObjectId,
			ref: 'Category',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Subcategory', subcategorySchema);
