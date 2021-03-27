const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ee9a464a6c7bb8bf6dbbd96ab0f730ba&query=${longitude},${latitude}`;

    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services!', undefined)
        } else if (body.current.length === 0) {
            callback('Unable to find weather for this location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out, but it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast