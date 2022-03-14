const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Channel = require("../models/YoutubechannelModel");
const Search = require("../models/YoutubesearchModel");
const https = require('https');
const axios = require('axios');

const city = Joi.object({
    channelid: Joi.string().required(),
});

const apikey ="AIzaSyB0dWszqgwtznwA_-2ghzX1dmu5uaoJ_fk";

router.post("/channelinfo", auth, async (req, res) => {
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var id = req.body.channelid;

    const URL ='https://www.googleapis.com/youtube/v3/search?q='+ id +'&kind=youtube%23channel&part=snippet&type=channel&key='+ apikey;
    axios
    .get(URL)
    .then(response => {
        tmp = response;
        id = tmp.data.items[0].id.channelId
        const URL ='https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id='+ id +'&key='+ apikey;
        axios
        .get(URL)
        .then(response => {
            tmp = response;
            console.log(tmp.data);
            const value = new Channel({
                channelname: tmp.data.items[0].snippet.title,
                viewCount: tmp.data.items[0].statistics.viewCount,
                subscriberCount: tmp.data.items[0].statistics.subscriberCount,
                videoCount: tmp.data.items[0].statistics.videoCount,
            });
            res.send(value);
    })
    .catch(error => {
        console.log(error);
     });
    })
    .catch(error => {
        console.log(error);
     });
});

router.post("/search", auth, async (req, res) => {
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    var id = req.body.channelid;
    const URL ='https://www.googleapis.com/youtube/v3/search?q='+ id +'&part=snippet&key='+ apikey;
    axios
    .get(URL)
    .then(response => {
        tmp = response;
        var data = tmp.data.items[0]
        const value = new Search({
            kind: data.id.kind,
            publishedAt: data.snippet.publishedAt,
            title:  data.snippet.title,
            description: data.snippet.description,
            channelTitle: data.snippet.channelTitle,
            thumbnails: data.snippet.thumbnails.default.url
        });
        res.send(value);
    })
    .catch(error => {
        console.log(error);
     });
})

router.get("/test", async (req, res) => {
   res.status(200).send("test get");
});

module.exports = router;