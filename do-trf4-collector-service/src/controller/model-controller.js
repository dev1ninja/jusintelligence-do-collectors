const express = require("express");
const router = express.Router();

module.exports = (config) => {
  router
    .route("/save").post((req, res) => {
      res.send("POST METHOD")
    });
  return router;
}