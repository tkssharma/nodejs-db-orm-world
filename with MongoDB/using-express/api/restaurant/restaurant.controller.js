const Restaurant = require("./restaurant.model");
const Meal = require("../meal/meal.model");
const _ = require("lodash");

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of restaurants
exports.index = function(req, res) {
  Restaurant.find(function(err, restaurants) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, restaurants);
  });
};

// Get a single restaurant
exports.show = function(req, res) {
  Restaurant.findById(req.params.id)
    .populate("_meals")
    .exec(function(err, restaurant) {
      if (err) {
        return handleError(res, err);
      }

      if (!restaurant) {
        return res.send(404);
      }

      return res.json(restaurant);
    });
};

exports.create = function(req, res) {
  Meal.create(req.body._meals, function(err) {
    if (err) {
      return handleError(res, err);
    }
    const _meals = [];

    for (let i = 0; i < arguments[1].length; i++) {
      _meals.push(arguments[1][i]._id);
    }

    const _restaurant = req.body;
    _restaurant._meals = _meals;

    Restaurant.create(_restaurant, function(err, restaurant) {
      if (err) {
        return handleError(res, err);
      }

      restaurant.populate();

      return res.json(201, restaurant);
    });
  });
};

// Updates an existing restaurant in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Restaurant.findById(req.params.id, function(err, restaurant) {
    if (err) {
      return handleError(res, err);
    }
    if (!restaurant) {
      return res.send(404);
    }
    const updated = _.merge(restaurant, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, restaurant);
    });
  });
};

// Deletes a restaurant from the DB.
exports.destroy = function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    if (err) {
      return handleError(res, err);
    }
    if (!restaurant) {
      return res.send(404);
    }
    restaurant.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
