const router = require("express").Router();
const auth = require("../middleware/auth");
const Joi = require("@hapi/joi");
const Summoner = require("../models/SummonerModel");
const Match = require("../models/MatchModel");
const https = require('https');
const axios = require('axios');

const currency = Joi.object({
    name: Joi.string().required(),
});

const apikey = "RGAPI-1c762265-f808-480f-85c3-6f9cd23490dd"


router.post("/summoner", async (req, res) => {
    const { error } = currency.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var tmp;
    var name = encodeURIComponent(req.body.name);

    var url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ name;
    var config = {
                headers:{'X-Riot-Token': apikey}
    };
    var response = await axios.get(url, config);
    var url2 = 'https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+ response.data.id;
    var config2 = {
                headers:{'X-Riot-Token': apikey}
    };
    var response2 = await axios.get(url2, config2);
    var i = 0;
    var tmp = -1;
    for (const element of response2.data) {
        if (element.queueType == 'RANKED_SOLO_5x5')
            tmp = i;
        else
            i++;
    }
    if (tmp != -1) {
    var value = new Summoner({
        name: response.data.name,
        summonerLevel: response.data.summonerLevel.toString(),
        rank: response2.data[i].tier + ' ' + response2.data[i].rank,
        wins: response2.data[i].wins.toString(),
        losses: response2.data[i].losses.toString(),
        leaguePoints: response2.data[i].leaguePoints.toString(),
      });
      res.send(value);
    } else {
        var value = new Summoner({
            name: req.body.name,
            summonerLevel: response.data.summonerLevel.toString(),
            rank: "none",
            wins: "none",
            losses: "none",
            leaguePoints: "none",
          });
          res.send(value);
    }
});

router.post("/lastmatch", auth,async (req, res) => {
    const { error } = currency.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    var tmp;
    var name = encodeURIComponent(req.body.name);

    var url = 'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ name;
    var config = {
                headers:{'X-Riot-Token': apikey,}
    };
    var response = await axios.get(url, config);
    var url2 = 'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/'+ response.data.puuid + '/ids?start=0&count=20';
    var config2 = {
                headers:{'X-Riot-Token': apikey,}
    };
    var response2 = await axios.get(url2, config2);
    var url3 = 'https://europe.api.riotgames.com/lol/match/v5/matches/'+ response2.data[0];
    var config3 = {
                headers:{'X-Riot-Token': apikey,}
    };
    var i = 0;
    var tmp = -1;
    var response3 = await axios.get(url3, config3);
    for (const element of response3.data.info.participants) {
        if (element.puuid == response.data.puuid)
            tmp = i;
        else
            i++;
    }
    var win = "false";
    if (response3.data.info.participants[tmp].win == true)
        win = "true" 
    var value = new Match({
        name: response.data.name,
        gameMode: response3.data.info.gameMode,
        championName: response3.data.info.participants[tmp].championName,
        kills: response3.data.info.participants[tmp].kills.toString(),
        deaths: response3.data.info.participants[tmp].deaths.toString(),
        assists: response3.data.info.participants[tmp].assists.toString(),
        champLevel: response3.data.info.participants[tmp].champLevel.toString(),
        role: response3.data.info.participants[tmp].role,
        win: win,
      });
      res.send(value);
});


router.get("/test", async (req, res) => {
   res.status(200).send("test get");
  });
module.exports = router;
