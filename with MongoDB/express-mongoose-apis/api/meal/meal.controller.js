const Meal = require('./meal.model');

exports.list = async (req, res) => {
  try {
    const meals = await Meal.find({});
    return res.json(meals);
  } catch (err) {
    res.send(err);
  }
}

exports.create = async (req, res) => {
  try {
    const meal = await Meal.create(req.body);
    return res.json(meal)
  } catch (err) {
    res.send(err);
  }
}

exports.update = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    console.log(meal);
    meal.name = req.body.name;
    meal.price = req.body.price;
    meal.description = req.body.description;
    const updatedMeal = await meal.save();
    return res.json(updatedMeal)
  } catch (err) {
    res.send(err);
  }
}