const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All authors
router.get("/", async (req, res) => {
  const searchOptions = {};
  if (req.query.name) {
    searchOptions.name = {
      $regex: new RegExp(req.query.name, "i"),
    };
  }
  try {
    res.render("authors/index", {
      authors: await Author.find(searchOptions),
      searchOptions: req.query,
    });
  } catch (error) {
    res.redirect("/");
  }
});

// new authors
router.get("/new", (req, res) => {
  res.render("authors/new", {
    author: new Author(),
  });
});

// new authors
router.post("/", async (req, res) => {
  const author = new Author({ name: req.body.name });
  try {
    await author.save();
    res.redirect("/authors");
  } catch (error) {
    res.render("/authors/new", {
      name: req.body.name,
      errorMessage: error.message,
    });
  }
});

module.exports = router;
