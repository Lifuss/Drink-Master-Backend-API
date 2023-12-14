const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const { ctrlWrapper } = require("../../services");

module.exports = {
  singUp: ctrlWrapper(register),
  signIn: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
