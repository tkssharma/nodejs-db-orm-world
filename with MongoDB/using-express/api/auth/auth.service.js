const config = require("../../../config/keys");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const compose = require("composable-middleware");
const User = require("../user/user.model");
const validateJwt = expressJwt({ secret: config.secretOrKey });

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        validateJwt(req, res, next);
        if (req.query && req.query.hasOwnProperty("access_token")) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.findById(req.user.id, function(err, user) {
          if (err) return next(err);
          if (!user) return res.send(401);

          req.user = user;
          next();
        });
      })
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error("Required role needs to be set");

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (
        config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)
      ) {
        next();
      } else {
        res.send(403);
      }
    });
}

/**
 * Checks if current User is saved on local strategy
 */

function isLocalStrategy() {
  return compose().use(function(req, res, next) {
    User.findById(req.params.id, function(err, user) {
      if (!user) return res.send(401);

      if (user.provider === "local") next();
      else res.send(400, "Only can change password on local strategy");
    });
  });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id) {
  //return jwt.sign({ _id: id }, config.secretOrKey, { expiresInMinutes: 60*5 });
  return jwt.sign({ _id: id }, config.secretOrKey);
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user)
    return res.json(404, {
      message: "Something went wrong, please try again."
    });
  const token = signToken(req.user._id);
  res.cookie("token", JSON.stringify(token));
  res.redirect("/");
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;
exports.isLocalStrategy = isLocalStrategy;
