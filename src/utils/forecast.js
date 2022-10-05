const request = require('request')

const forecast = (lat,long,callback) =>{
    const url = `http://api.weatherstack.com/current?access_key=5a5af15b9c7d0367d67ea0e3637d9c0f&query=${lat},${long}`

    request({url,json:true},(error,response) => {
        if(error){
            callback(`Connection not found ${error}`,undefined)
        } else if (response.body.error) {
            callback(response.body.error.code + response.body.error.info,undefined)
        } else {
            callback(undefined,{
                temperature:`${response.body.current.temperature}'C`,
                humidity:`${response.body.current.humidity}%`,
                wind:`${response.body.current.wind_speed}km/h`
            })
        }
    })
}


module.exports = forecast