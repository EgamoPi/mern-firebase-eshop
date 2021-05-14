const Subcategory = require('../models/subcategoryModel');
const slugify = require('slugify');

exports.createSubcategory = async (req, res) => {
	try {
		const { name, parent } = req.body;
		const subcategory = await new Subcategory({
			name,
			parent,
			slug: slugify(name),
		}).save();
		res.status(201).json(subcategory);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.updateSubcategory = async (req, res) => {
	try {
		const { name, parent } = req.body;
		const updated = await Subcategory.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, parent, slug: slugify(name) },
			{ new: true }
		).exec();
		res.status(201).json(updated);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.getAllSubcategories = async (req, res) => {
	try {
		const subcategories = await Subcategory.find({})
			.sort({ createdAt: -1 })
			.exec();
		res.status(200).json(subcategories);
	} catch (error) {
		console.log(error);
		res.status(400).json(error);
	}
};

exports.getSubcategory = async (req, res) => {
	try {
		const subcategory = await Subcategory.findOne({
			slug: req.params.slug,
		}).exec();
		res.status(200).json(subcategory);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.deleteSubcategory = async (req, res) => {
	try {
		const deleted = await Subcategory.findOneAndDelete({
			slug: req.params.slug,
		}).exec();
		if (deleted) {
			res.json(deleted);
		} else {
			res.status(400).json('error: could not delete, category does not exist');
		}
	} catch (error) {
		res.status(400).json(error);
	}
};
