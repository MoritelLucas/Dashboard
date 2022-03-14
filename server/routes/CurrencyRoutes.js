const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Value = require("../models/ValueModel");
const https = require('https');
const axios = require('axios');

const currency = Joi.object({
    value: Joi.string().pattern(/^[0-9]+$/).required(),
    currency1: Joi.string().required(),
    currency2: Joi.string().required(),
});

router.post("/value", auth, async (req, res) => {
    const { error } = currency.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var tmp;
    var tmp2 = Number(req.body.value);
    const apikey = "3d1d18e56e2940e3b8f8987826f9771f";

    const URL ='https://api.currencyfreaks.com/latest?apikey='+ apikey +'&symbols='+req.body.currency1+ ',' +req.body.currency2;
    axios
    .get(URL)
    .then(response => {
        tmp = response.data.rates;
        let test = Object.values(tmp)[0];
        let test2 = Object.values(tmp)[1];
        var final = tmp2 / test * test2;
        var final2 = final.toString();
        const value = new Value({
            value: final2,
          });
        res.send(value);
    })
    .catch(error => {
        console.log(error);
     });
});


router.get("/test", async (req, res) => {
   res.status(200).send("test get");
  });
module.exports = router;
