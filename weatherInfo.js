const request = require("request");

const getWeatherInfo = ({ address, lat, lng }, callback) => {
  const options = {
    url: `http://api.weatherstack.com/current?access_key=b4dcf9cc6576e77085d54597bcb1d7d1&query=${address}`,
    json: true,
  };
  request(options, (error, response, body) => {
    if (body.error) {
      callback(error, undefined);
    } else {
      const current = body.current;
      const {
        weather_descriptions,
        observation_time,
        temperature,
        humidity,
      } = current;
      const weatherInfo = `${weather_descriptions[0]}.At ${observation_time},it is ${temperature}°C with ${humidity}% humidity in ${address}(${lat},${lng})`;
      callback(undefined, weatherInfo);
    }
  });
};

module.exports = getWeatherInfo;
