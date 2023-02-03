const mongoose = require("mongoose");
const slugify = require("slugify");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter course name"],
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      unique: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  },
  { timestamps: true }
);

CourseSchema.pre("validate", function(next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  });
  next();
});

const Course = mongoose.model("Course", CourseSchema);
module.exports = Course;
