const express = require("express");
const controller = require("./order.controller");
const auth = require("../auth/auth.service");

const router = express.Router();

router.get("/", auth.hasRole("user"), controller.index);
router.get("/restaurant", auth.hasRole("manager"), controller.restaurant_index);
router.get("/:id", auth.hasRole("user"), controller.show);
router.post("/", auth.hasRole("user"), controller.create);
router.put("/:id", auth.hasRole("user"), controller.update);
router.patch("/:id", auth.hasRole("user"), controller.update);
router.delete("/:id", auth.hasRole("user"), controller.destroy);

module.exports = router;
