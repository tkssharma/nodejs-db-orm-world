const User = require('../user/user.model');


const isLoggedIn = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.send(401)
      }
      next();
    } else {
      return res.send(401);
    }
  } catch (err) {
    next(err)
  }
}

module.exports = { isLoggedIn }