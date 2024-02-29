const { User } = require("../models/users.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwt");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Error");
  }
};

const register = async (req, res) => {
  const body = req.body;
  const { email, password, fullName } = req.body;
  try {
    const isExist = await User.findOne({ email });
    if (!isExist) {
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hash, fullName });
      await user.save();
      return res.send(user);
    } else {
      return res.send("This Email is  already in use, try another Email");
    }
  } catch (error) {
    res.status(400).send("Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = generateToken({
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          userEvents: user.userEvents,
          userPurchases: user.userPurchases,
          role: "free",
        });
        return res.send({ user, token });
      }
      return res.status(401).send("Email or Password are incorrect");
    } else {
      res.status(200).send("not Found");
    }
  } catch (error) {
    res.status(400).send("Error");
  }
};

const getUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};
const getOnlineUser = async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    console.log(error);
    res.status(400).send("Error");
  }
};

const updateUser = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  let user;
  try {
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      user = await User.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
    } else {
      res.send("bla bla");
    }
    return res.send(user);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error");
  }
};

module.exports = {
  register,
  login,
  updateUser,
  getUsers,
  getUser,
  getOnlineUser,
};
