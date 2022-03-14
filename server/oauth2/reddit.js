const GOOGLE_ID = "744516398-0hqddj6prboe4602mfm4b7f46h95v3n0.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const User = require("../models/UserModel").pool;
const REDIRECT_URI = "http://localhost:4200/public/redditlog";

const queryString = require('query-string');
const express = require("express");
const app = express.Router();

var axios = require('axios');
var constants = require('../middleware/constants');
var jwToken = null;
const jwt = require("jsonwebtoken");

app.get('/redditlog', async (req, res) => {
    const code = req.query.code;
    await axios
    .post(
      'http://localhost:8080/api/reddit/addaccesstoken',
      {
            "access_token": req.query.code,
      }
    )
    .then((res) => {console.log(res)})
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
    res.redirect(REDIRECT_URI);
});

module.exports = app