const Meal = require("./meal.model");
const _ = require("lodash");

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of meals
exports.index = function(req, res) {
  Meal.find(function(err, meals) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, meals);
  });
};

// Get a single meal
exports.show = function(req, res) {
  Meal.findById(req.params.id, function(err, meal) {
    if (err) {
      return handleError(res, err);
    }
    if (!meal) {
      return res.send(404);
    }
    return res.json(meal);
  });
};

exports.create = function(req, res) {
  Meal.create(req.body, function(err, meal) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, meal);
  });
};

// Updates an existing meal in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Meal.findById(req.params.id, function(err, meal) {
    if (err) {
      return handleError(res, err);
    }
    if (!meal) {
      return res.send(404);
    }
    const updated = _.merge(meal, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, meal);
    });
  });
};

// Deletes a meal from the DB.
exports.destroy = function(req, res) {
  Meal.findById(req.params.id, function(err, meal) {
    if (err) {
      return handleError(res, err);
    }
    if (!meal) {
      return res.send(404);
    }
    meal.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
