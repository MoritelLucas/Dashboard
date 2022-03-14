const GOOGLE_ID = "744516398-0hqddj6prboe4602mfm4b7f46h95v3n0.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const User = require("../models/UserModel").pool;
const UI_ROOT_URI = "http://localhost:4200/public/dashboard";
const REDIRECT_URI = "http://localhost:8080/auth/google";

const queryString = require('query-string');
const express = require("express");
const app = express.Router();

var axios = require('axios');
var constants = require('../middleware/constants');
var jwToken = null;
const jwt = require("jsonwebtoken");

function getTokens(code)
{
    const url = "https://oauth2.googleapis.com/token";
    const body = {
      code,
      client_id: GOOGLE_ID,
      client_secret: GOOGLE_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    };
  
    return axios
      .post(url, queryString.stringify(body), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        console.error(`Failed to fetch auth tokens`);
        throw new Error(error.message);
    });
}

app.get(`/auth/google/`, async (req, res) => {
    const code = req.query.code;
    const {id_token, access_token}=await getTokens(code);
    await axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    )
    .then((res) => {res.data, 
      constants.jsonOauth = res.data})
    .catch((error) => {
      console.error(`Failed to fetch user`);
      throw new Error(error.message);
    });
    res.redirect(UI_ROOT_URI);
});

app.get('/oauth2', async (req, res) => {
    const TOKEN_SECRET = "1234";
    const payload = {
        id: constants.jsonOauth.user_id,
        name: constants.jsonOauth.name
    };
    User.query(`SELECT * FROM users
    WHERE email = $1`, [constants.jsonOauth.email], async (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0) {
        jwToken = jwt.sign(payload, TOKEN_SECRET, {
            expiresIn: "2h",
        },(err, jwToken) => {
          if(err) console.log(err)
            var jwt = {tokenId: jwToken};
            const merged = Object.assign(constants.jsonOauth, jwt)
            res.header("auth-token", constants.jsonOauth).send(constants.jsonOauth)
        })
      } else {
        User.query(`INSERT INTO users 
            (email, name, password)
            VALUES ($1, $2, $3);`,
            [constants.jsonOauth.email, constants.jsonOauth.name, "google"],
            (err, results) => {
            if (err) throw err;
            jwToken = jwt.sign(payload, TOKEN_SECRET, {
                expiresIn: "2h",
            },(err, jwToken) => {
                if(err) console.log(err)
                var jwt = {tokenId: jwToken};
                const merged = Object.assign(constants.jsonOauth, jwt);

                res.status(200).json(constants.jsonOauth);
                console.log(merged);
            }
            )}
        )}
    })
});

module.exports = app