const Order = require("./order.model");
const _ = require("lodash");
const StateMachine = require("javascript-state-machine");

function createStateMachine(order) {
  return new StateMachine({
    init: order.status,
    transitions: [
      { name: "cancelled", from: "placed", to: "cancelled" },
      { name: "processing", from: "placed", to: "processing" },
      { name: "in_route", from: "processing", to: "in_route" },
      { name: "delivered", from: "in_route", to: "delivered" },
      { name: "received", from: "delivered", to: "received" }
    ]
  });
}

function handleError(res, err) {
  return res.send(500, err);
}

// Get list of orders
exports.index = function(req, res) {
  Order.find({ _user: req.user._id })
    .sort("-created_at")
    .populate("_restaurant")
    .exec(function(err, orders) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, orders);
    });
};

// Get list of restaurant orders
exports.restaurant_index = function(req, res) {
  Order.find({ _restaurant: req.user._id })
    .populate("_restaurant")
    .exec(function(err, orders) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, orders);
    });
};

// Get a single order
exports.show = function(req, res) {
  Order.findById(req.params.id)
    .populate("_meals")
    .populate("_user")
    .populate("_restaurant")
    .exec(function(err, order) {
      if (err) {
        return handleError(res, err);
      }

      if (!order) {
        return res.send(404);
      }

      return res.json(order);
    });
};

exports.create = function(req, res) {
  Order.create({ ...req.body, _user: req.user._id }, function(err, order) {
    if (err) {
      return handleError(res, err);
    }

    order.populate();

    return res.json(201, order);
  });
};

// Updates an existing order in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findById(req.params.id, function(err, order) {
    if (err) {
      return handleError(res, err);
    }
    if (!order) {
      return res.send(404);
    }
    const fsm = createStateMachine(order);
    if (fsm.cannot(req.body.status))
      return res.status(403).json({
        status: `Not a valid transition from ${order.status} to ${req.body.status}.`
      });
    const updated = _.merge(order, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }

      return res.json(200, order);
    });
  });
};

// Deletes a order from the DB.
exports.destroy = function(req, res) {
  Order.findById(req.params.id, function(err, order) {
    if (err) {
      return handleError(res, err);
    }
    if (!order) {
      return res.send(404);
    }
    order.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};
