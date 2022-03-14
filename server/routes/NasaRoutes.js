const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Nasa = require("../models/NasaModel");
const https = require('https');
const axios = require('axios');

const city = Joi.object({
    sol: Joi.string().required(),
    cam: Joi.string().required(),
});

const apikey ="cpJZemGKNT86oREVjv5e14sDSchxg3XlOgbqlKDi";

router.post("/picture", auth, async (req, res) => {
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const URL ='https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+req.body.sol+'&camera='+req.body.cam+'&api_key='+ apikey;
    axios
    .get(URL)
    .then(response => {
        tmp = response.data.photos[0];
        const value = new Nasa({
            earth_date: tmp.earth_date,
            img_src: tmp.img_src,
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
