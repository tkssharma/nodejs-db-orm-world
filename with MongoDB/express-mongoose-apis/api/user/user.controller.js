const User = require('./user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  // validate payload  using joi, class-validator 
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: "Email not found" });
  }
  const isMatch = bcrypt.compare(password, user.password);
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name
    }
    const token = await jwt.sign(payload, process.env.secretOrKey, { expiresIn: 360000 });
    res.status(200).json({ success: true, token })

  } else {
    return res
      .status(400)
      .json({ email: "Password incorrect" });
  }
}

exports.register = async (req, res, next) => {
  // validate payload  using joi, class-validator 
  try {
    const { password, role, email, name } = req.body;
    console.log(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        email: 'email already exists'
      })
    }
    const user = new User({
      password, role, email, name
    });
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    user.password = hashPassword;
    const savedUser = await user.save();
    delete savedUser.password;
    return res.status(201).send(savedUser);
  } catch (err) {
    console.log(err);
    return res.send(500, err);
  }
}

exports.show = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).send(user);
};
