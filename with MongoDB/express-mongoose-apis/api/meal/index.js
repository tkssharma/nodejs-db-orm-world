const controller = require('./meal.controller');

const express = require('express');
const router = express.Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.put("/:id", controller.update);



module.exports = router;