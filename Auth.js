const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person");

//username Authentication

passport.use(
  new LocalStrategy(async (username, password, done) => {
    //logic
    try {
      //   console.log('Received criedentials:',username,password);
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "Incorrect username." });

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password Incorrect." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
