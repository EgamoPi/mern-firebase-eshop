const Category = require('../models/categoryModel');
const slugify = require('slugify');

exports.createCategory = async (req, res) => {
	try {
		const { name } = req.body;
		console.log(req.body);
		const category = await new Category({ name, slug: slugify(name) }).save();
		res.status(201).json(category);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.updateCategory = async (req, res) => {
	try {
		const { name } = req.body;
		const updated = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		).exec();
		res.status(201).json(updated);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.getAllCategories = async (req, res) => {
	try {
		const categories = await Category.find({}).sort({ createdAt: -1 }).exec();
		res.status(200).json(categories);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.getCategory = async (req, res) => {
	try {
		const category = await Category.findOne({ slug: req.params.slug }).exec();
		res.status(200).json(category);
	} catch (error) {
		res.status(400).json(error);
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const deleted = await Category.findOneAndDelete({
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
