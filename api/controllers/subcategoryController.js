const Subcategory = require('../models/subcategoryModel');
const slugify = require('slugify');

exports.create = async (req, res) => {
	try {
		const { name, parent } = req.body;
		res.json(
			await new Subcategory({ name, parent, slug: slugify(name) }).save()
		);
	} catch (err) {
		console.log('SUB CREATE ERR ----->', err);
		res.status(400).send('Create sub failed');
	}
};

exports.list = async (req, res) =>
	res.json(await Subcategory.find({}).sort({ createdAt: -1 }).exec());

exports.read = async (req, res) => {
	let sub = await Subcategory.findOne({ slug: req.params.slug }).exec();
	res.json(sub);
};

exports.update = async (req, res) => {
	const { name, parent } = req.body;
	try {
		const updated = await Subcategory.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true }
		);
		res.json(updated);
	} catch (err) {
		res.status(400).send('Sub update failed');
	}
};

exports.remove = async (req, res) => {
	try {
		const deleted = await Subcategory.findOneAndDelete({
			slug: req.params.slug,
		});
		res.json(deleted);
	} catch (err) {
		res.status(400).send('Sub delete failed');
	}
};
