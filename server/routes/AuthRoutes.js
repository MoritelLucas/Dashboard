const router = require("express").Router();
const User = require("../models/UserModel").pool;
const Token = require("../models/TokenModel");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");
var myModule = require('../oauth2/google');

var constants = require('../middleware/constants');

const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});
  
const loginSchema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
});

router.post("/register", async (req, res) => {
  var sendUser;
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
     User.query(`SELECT * FROM users
      WHERE email = $1`, [req.body.email], async (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0){
         return res.status(400).send("Email already exists");
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        User.query(`INSERT INTO users 
        (email, name, password)
        VALUES ($1, $2, $3);`,
        [req.body.email, req.body.name, hashPassword],
          (err, results) => {
            if (err){
              throw err;
            }
          });

    	  try{
          sendUser = await User.query('SELECT * FROM users');
          res.send(sendUser.rows);
        } catch(err){
          res.status(200).send(sendUser.rows);
        }
	    }
	});
});

router.post("/login", async (req, res) => {
    const TOKEN_SECRET = "1234";
    var jwToken;
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    User.query(`SELECT * FROM users
    WHERE name = $1`, [req.body.name], async (err, results) => {
      if (err) throw err;
      if (results.rows.length > 0){
        const user = results.rows[0];
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            const payload = {
              id: user.user_id,
              name: user.name
          };
          jwToken = jwt.sign(payload, TOKEN_SECRET, {
              expiresIn: "2h",
            },(err, jwToken) => {
              if(err) {
                 console.log(err)
              } else {
                constants.jsonOauth = results.rows[0];
                console.log(constants.jsonOauth)
                res.status(200).json(jwToken);
                res.header("auth-token", jwToken).send(jwToken)
             }
            });
          } else {
            res.status(400).send("Username or password is wrong");
          }
        });
      } else {
        res.status(400).send("User is not registered");
      }
    });
  });

module.exports = router;
