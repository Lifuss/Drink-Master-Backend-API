const jwt = require("jsonwebtoken");
const { requestError } = require("../services");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      throw requestError(401);
    }

    const { id } = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      throw requestError(401);
    }
    req.user = user;

    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
      error.message = "Unauthorized";
    }
    next(error);
  }
};

module.exports = authentication;
