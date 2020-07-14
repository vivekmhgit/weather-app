const getGeoCode = require("./geoCode");
const getWeatherInfo = require("./weatherInfo");

console.log("WEATHER APP");
if (process.argv[2]) {
  getGeoCode(process.argv[2], (error, data) => {
    if (error) return console.log(error);
    getWeatherInfo(data, (error, data) => {
      if (error) return console.log(error);
      console.log(data);
    });
  });
} else {
  console.log("Please input location");
}
