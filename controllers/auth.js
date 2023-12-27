const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { nanoid } = require('nanoid');

const { SECRET_KEY } = process.env;

const { ctrlWrapper, HttpError } = require('../helpers');
const { User } = require('../models/user');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const compareHashedPassword = await bcrypt.compare(password, hashedPassword);

  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
    verificationToken,
  });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name } = req.user;

  res.json({
    email,
    name,
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  res.status(204).json({
    message: 'Logout success',
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),

  logout: ctrlWrapper(logout),
};
