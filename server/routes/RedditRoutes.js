const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Reddit = require("../models/RedditModel");
const Redditsearch = require("../models/RedditsearchModel");
const Redditposts = require("../models/RedditpostsModel")
const https = require('https');
const axios = require('axios');
const utf8 = require('utf8');
const queryString = require('query-string');

const city = Joi.object({
    Reddit: Joi.string().required(),
});
const token = Joi.object({
    access_token: Joi.string().required(),
});

const apid = "UF_Vzmpxo4q3HQZ85NzVSw";
const secret = "sMYwxWZrD5xFBkLN38TMrUdAOiGh4Q";
var mytoken = "";
const callback = 'http://localhost:8080/api/redditlog';
const url3 ='https://www.reddit.com/api/v1/authorize?client_id='+apid+'&response_type=code&state=test&redirect_uri=http://localhost:8080/api/redditlog&duration=permanent&scope=*';

router.get("/my/sub", async (req, res) => {
    if (mytoken != "") {
    var token3 = 'bearer ' + mytoken;
    var URL = 'https://oauth.reddit.com/subreddits/mine';
    const config2 = {
        method: 'get',
        url: URL,
        headers: { "content-type": 'application/x-www-form-urlencoded',
        "authorization": token3
        },
    }
    let res3 = await axios(config2)
    let datatmp = res3.data.data.children[0].data
    let tmp = datatmp.subscribers.toString();
    const value = new Redditsearch({
        name: datatmp.display_name_prefixed,
        subscribers: tmp,
        public_description: datatmp.public_description,
        lang: datatmp.lang,
        url: datatmp.url,
        banner_img: datatmp.banner_img
    });
    res.send(value);
    } else {
        res.status(400).send("Error no access token");
    }
})

router.post("/search", auth, async (req, res) => {
    var token = 'bearer ' + mytoken;
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var URL = 'https://oauth.reddit.com/subreddits/search.json?q=r/'+ req.body.Reddit + '&limit=1' ;
    const config2 = {
        method: 'get',
        url: URL,
        headers: { "content-type": 'application/x-www-form-urlencoded',
        "authorization": token
        },
    }
    let res3 = await axios(config2)
    let datatmp = res3.data.data.children[0].data
    let tmp = datatmp.subscribers.toString();
    const value = new Redditsearch({
        name: datatmp.display_name_prefixed,
        subscribers: tmp,
        public_description: datatmp.public_description,
        lang: datatmp.lang,
        url: datatmp.url,
        banner_img: datatmp.banner_img
    });
    res.send(value);
})

router.post("/posts", auth, async (req, res) => {
    var token = 'bearer ' + mytoken;
    const { error } = city.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var URL = 'https://oauth.reddit.com/r/'+ req.body.Reddit;
    const config2 = {
        method: 'get',
        url: URL,
        headers: { "content-type": 'application/x-www-form-urlencoded',
        "authorization": token
        },
    }
    let res3 = await axios(config2)
    let datatmp = res3.data.data.children[0].data
    let tmp = datatmp.ups.toString();
    const value = new Redditposts({
        title: datatmp.title,
        thumbnail: datatmp.thumbnail,
        url: datatmp.url,
        ups: tmp,
    });
    res.send(value);
})

router.post("/addaccesstoken", async (req, res) => {
    const { error } = token.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    mytoken = req.body.access_token;
    let data = apid + ':'+ secret;
    let data2 = utf8.encode(data)
    let base64data = Buffer.from(data2).toString('base64');
    var basicauth= 'Basic ' +base64data;
    const url = 'https://www.reddit.com/api/v1/access_token';
    let res2 = await axios.post(url,
        queryString.stringify({
            'grant_type':'authorization_code',
            'code':mytoken,
            'redirect_uri':callback
        }),
        {
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': basicauth,
        },
    })
    mytoken = res2.data.access_token;
    res.status(200).send(mytoken);
});

router.get("/test", async (req, res) => {
   res.status(200).send("test get");
});

module.exports = router;
