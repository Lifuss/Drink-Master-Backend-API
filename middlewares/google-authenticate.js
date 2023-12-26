const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const bcrypt = require("bcryptjs");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const { User } = require("../models/user");

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (profile, done) => {
  try {
    const { displayName, picture, email } = profile;
    const user = await User.findOne({ email });

    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(nanoid(), 5);
    const verifyToken = nanoid();
    const date = new Date();
    const newUser = await User.create({
      email,
      password,
      name: displayName,
      photo: picture,
      verifyToken,
      date,
      isAdult: true,
    });

    done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
