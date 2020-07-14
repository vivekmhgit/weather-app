const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const getGeoCode = require("../geoCode");
const getWeatherInfo = require("../weatherInfo");

//paths for express
const publicDirPath = path.join(__dirname, "/public");
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

//view engine setting
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static files
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weatherly",
    desc: "This is a Weather Info App which gives the forecast for a location",
    name: "Vivek",
  });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Vivek" });
});
app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Vivek", contact: "9946637633" });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "No address as input" });
  }
  getGeoCode(address, (error, data) => {
    if (error) return res.send("error");
    getWeatherInfo(data, (error, data) => {
      if (error) return res.send("error");
      const info = { data };
      res.send(info);
    });
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log("Listening to port 3000...");
});
