// const { boolean } = require("joi");
const { Schema } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    date: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "recipe",
      },
    ],
    firstFavDrink: {
      type: Boolean,
      default: false,
    },
    tenthFavDrink: {
      type: Boolean,
      default: false,
    },
    lastVisit: {
      type: Date,
      default: null,
    },
    visitCount: {
      type: Number,
      default: 0,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: true,
    },
    token: String,
    avatarURL: String,
    isAdult: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

module.exports = { userSchema };
