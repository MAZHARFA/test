const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const personSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 6,
    message: "Enter a mini 4 letter or max six letter ",
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]{3,}\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address with full domain (e.g., name@example.com)",
    ],
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters uppercase, lowercase and special character",
    ],
  },
  confirmpassword: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    ],
  },
});

personSchema.methods.comparePassword = async function (userpassword) {
  try {
    //use bcrypt to comapre the user password and hash password
    const isMatch = await bcrypt.comparePassword(userpassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

personSchema.pre("save", async function (next) {
  const person = this;
  //hash the password only if it is modified (or is new)
  if (!person.isModified("password")) return next();
  try {
    //hash password generation
    const salt = await bcrypt.genSalt(14);
    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);
    //hash the confirm password
    const confirm = await bcrypt.hash(person.confirmpassword, salt);
    //overide the plain password with the hased one
    person.password = hashedPassword;
    //call the hash password
    person.confirmpassword = confirm;
    next();
  } catch (err) {
    next(err);
  }
});

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
