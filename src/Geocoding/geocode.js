// const fetch = require('node-fetch');

// const key = '900dc9c1f2cd42eb9c4ca2e997315906'
// exports.geoCode = async (query) => {
//     let result = null
//     let url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${key}`
//     result = await fetch(url).then(res => result = res.json())
//     return result.results[0] || null
// }

exports.distance = (point1, point2, unit = 'K') => {
    if ((point1.latitude == point2.latitude) && (point1.longitude == point2.longitude)) {
        return 0;
    }
    else {
        var radpoint1lat = Math.PI * point1.latitude / 180;
        var radpoint2lat = Math.PI * point2.latitude / 180;
        var theta = point1.longitude - point2.longitude;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radpoint1lat) * Math.sin(radpoint2lat) + Math.cos(radpoint1lat) * Math.cos(radpoint2lat) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        else if (unit == "N") { dist = dist * 0.8684 }
        return Number(dist).toFixed(3);
    }
}
