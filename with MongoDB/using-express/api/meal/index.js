const express = require("express");
const controller = require("./meal.controller");
const auth = require("../auth/auth.service");

const router = express.Router();

router.get("/", auth.hasRole("user"), controller.index);
router.get("/:id", auth.hasRole("user"), controller.show);
router.post("/", auth.hasRole("manager"), controller.create);
router.put("/:id", auth.hasRole("manager"), controller.update);
router.patch("/:id", auth.hasRole("manager"), controller.update);
router.delete("/:id", auth.hasRole("manager"), controller.destroy);

module.exports = router;
