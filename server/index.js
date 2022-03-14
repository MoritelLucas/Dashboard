const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const dotenv = require("dotenv");
const google = require("./oauth2/google");
const auth = require("./middleware/auth");
const AuthRoutes = require("./routes/AuthRoutes");
const cors = require('cors');
const { networkInterfaces } = require('os')

const CurrencyRoutes = require("./routes/CurrencyRoutes");
const WeatherRoutes = require("./routes/WeatherRoutes");
const LocationRoutes = require("./routes/LocationRoutes");
const YoutubeRoutes = require("./routes/YoutubeRoutes");
const RedditRoutes = require("./routes/RedditRoutes");
const Redditoauth = require("./oauth2/reddit");
const RiotRoutes = require("./routes/RiotRoutes")
const NasaRoutes = require("./routes/NasaRoutes")

const nets = networkInterfaces();
const results = Object.create(null);

dotenv.config();

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.engine('html', require('ejs').renderFile);

app.use(google);
app.use(express.json());
app.use(cors());

app.use("/api/user", AuthRoutes);
app.use("/api/currency", CurrencyRoutes);
app.use("/api/weather", WeatherRoutes);
app.use("/api/location", LocationRoutes);
app.use("/api/youtube", YoutubeRoutes);
app.use("/api/reddit", RedditRoutes);
app.use("/api/riot", RiotRoutes);
app.use("/api/nasa", NasaRoutes);
app.use("/api", Redditoauth);
app.use(express.static('./dist/client/'))

app.get('/about.json', function(req, res) {
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4') {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
  }
  var ip = results["eth0"][0];
  var time=Math.floor(new Date().getTime() / 1000)
  res.render(__dirname + "/index.html", {ip:ip, time:time});
});

app.get('/', (req, res) => {
  res.send('API running')
})
app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));