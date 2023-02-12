const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bycrpt = require("bcrypt");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true,
      unique: true
    },
    password: {
      type: String,
      require: true
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student"
    }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  const user = this;

  bycrpt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
