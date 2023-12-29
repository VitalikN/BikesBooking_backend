const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { HandleErrorMongoose } = require('../helpers');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: emailRegex,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required(),
});
const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(5).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};
userSchema.post('save', HandleErrorMongoose);

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
