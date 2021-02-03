const express = require("express");

const db = require("../../data/db-config.js");
const Users = require('./user-model.js')

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "failed to get users" })
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await Users.findById(id);
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({ message: "id does not exist" })
    }
  } catch (err) {
    res.status(500).json({ message: "failed to get user" })
  }
});

router.post("/", async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await Users.add(userData);
    res.json(newUser); 
  } catch (err) {
    res.status(500).json({ message: "failed to create new user" })
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const newUser = await Users.update(id, changes)
    if (newUser) {
      res.json(newUser);
    } else {
      res.status(404).json({ message: "invalid id"})
    }
  } catch (err) {
    res.status(500).json({ message: "failed to update user" })
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Users.remove(id);
    if(count) {
      res.json({ message: `${count} records removed` })
    } else {
      res.status(404).json({ message: "invalid id" })
    }
  } catch (err) {
    res.status(500).json({ message: "failed to delete user" })
  }
});

router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Users.findPosts(id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: `failed to get posts from id: ${id}` })
  }
})

module.exports = router;
