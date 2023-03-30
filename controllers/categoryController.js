const Category = require("../models/Category");
const slugify = require("slugify");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).redirect("/users/dashboard")
  } catch (error) {
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updatecategory = await Category.findOneAndUpdate(
      {
        _id: req.params.id
      },
      {
        name: req.body.name,
        slug: slugify(req.body.name, {
          lower: true,
          strict: true
        })
      }
    );
    //await updatecategory.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail"
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ category: req.params.id });

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail"
    });
  }
};
