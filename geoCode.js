const request = require("request");

const getGeoCode = (address, callback) => {
  const geoOptions = {
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidml2ZWttaCIsImEiOiJja2NlamtxemUwOTAwMnJuejh0a2RsY21rIn0.kVkOOTqcYLbIm20TrHYWRQ&limit=1`,
    json: true,
  };
  request(geoOptions, (error, response, body) => {
    if (error) {
      callback(error, undefined);
    } else {
      const { center } = body.features[0];
      const geoCodes = { lat: center[1], lng: center[0], address };
      callback(undefined, geoCodes);
    }
  });
};

module.exports = getGeoCode;
