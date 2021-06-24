const router = require("express").Router();

const usersDB = require("../models/users-model.js");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await usersDB.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
});

// GET USER BY ID
router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await usersDB.findById(userId);
    if (!user) {
      res
        .status(404)
        .json({ err: "The user with the specified id does not exist" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(500).json({ err: "The user information could not be retrieved" });
  }
});

// INSERT USER INTO DB
router.post("/", async (req, res) => {
  const newUser = req.body;
  if (!newUser.name) {
    res.status(404).json({ err: "Please provide the name" });
  } else {
    try {
      const user = await usersDB.addUser(newUser);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ err: "Error in adding user" });
    }
  }
});

router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const newChanges = req.body;
  if (!newChanges.name) {
    res.status(404).json({ err: "You are missing information" });
  } else {
    try {
      const addChanges = await usersDB.updateUser(userId, newChanges);
      res.status(200).json(addChanges);
    } catch (err) {
      res.status(500).json({ err: "Error in updating user" });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const deleting = await usersDB.removeUser(userId);
    res.status(204).json(deleting);
  } catch (err) {
    res.status(500).json({ err: "Error in deleting user" });
  }
});

module.exports = router;
