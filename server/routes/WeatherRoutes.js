const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Weather = require("../models/WeatherModel");
const https = require('https');
const axios = require('axios');
const Value = require("../models/ValueModel");

const city = Joi.object({
    city: Joi.string().required(),
});
router.post("/city", auth, async (req, res) => {
    const { error } = city.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    var apikey ="f03bd7f488e6f49b8775bb77a60b638f";

    const URL ='http://api.weatherstack.com/current?access_key='+ apikey +'&query=' + req.body.city;
    axios
    .get(URL)
    .then(response => {
        tmp = response.data.current;
        const value = new Weather({
            city: req.body.city,
            temperature: tmp.temperature.toString(),
            weather_descriptions: tmp.weather_descriptions[0],
            wind_speed: tmp.wind_speed.toString(),
            wind_degree: tmp.wind_degree.toString(),
            wind_dir: tmp.wind_dir,
            pressure: tmp.pressure.toString(),
            precip: tmp.precip.toString(),
            humidity: tmp.humidity.toString(),
            cloudcover: tmp.cloudcover.toString(),
            visibility: tmp.visibility.toString(),
            is_day: tmp.is_day,
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
