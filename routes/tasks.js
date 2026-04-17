const express = require('express');
const route = express.Router();
const { index, create, update, show, destroy } = require("../controllers/taskController");

route.get("/", index);
route.post("/", create);
route.put("/:id", update);
route.get("/:id", show);
route.delete("/:id", destroy);


module.exports = route;