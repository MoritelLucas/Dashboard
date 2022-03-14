const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Location = require("../models/LocationModel");
const Time = require("../models/TimeModel");
const https = require('https');
const axios = require('axios');

const city = Joi.object({
    city: Joi.string().required(),
});

const apikey ="f03bd7f488e6f49b8775bb77a60b638f";

router.post("/city", auth, async (req, res) => {
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const URL ='http://api.weatherstack.com/current?access_key='+apikey +'&query=' + req.body.city;
    axios
    .get(URL)
    .then(response => {
        tmp = response.data.location;
        const value = new Location({
            city: req.body.city,
            country: tmp.country,
            lat: tmp.lat,
            lon: tmp.lon,
            timezone_id: tmp.timezone_id,
          });
        res.send(value);
    })
    .catch(error => {
        console.log(error);
     });
});

router.post("/time", auth, async (req, res) => {
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const URL ='http://api.weatherstack.com/current?access_key='+apikey +'&query=' + req.body.city;
    axios
    .get(URL)
    .then(response => {
        console.log(response.data);
        const value = new Time({
            hour: response.data.location.localtime,
            city: req.body.city,
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
