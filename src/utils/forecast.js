const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=5a5af15b9c7d0367d67ea0e3637d9c0f&query=${lat},${long}`
    // sample: http://api.weatherstack.com/current?access_key=5a5af15b9c7d0367d67ea0e3637d9c0f&query=-33.7450185,151.1424708
    request({url,json:true},(error,response) => {
        if(error){
            callback(`Connection not found ${error}`,undefined)
        } else if (response.body.error) {
            callback(response.body.error.code + response.body.error.info,undefined)
        } else {
            callback(undefined,{
                summary: `${response.body.current.weather_descriptions[0]}`,
                temperature:`${response.body.current.temperature}'C`,
                humidity:`${response.body.current.humidity}%`,
                rain:`${response.body.current.precip}mm`,
                wind:`${response.body.current.wind_speed}km/h`
            })
        }
    })
}


module.exports = forecast