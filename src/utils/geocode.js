const request = require("request")

const locationLookUp = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?language=en&limit=1&access_token=pk.eyJ1IjoibWljZHJvcHdhd2EiLCJhIjoiY2w3ZzhlOTAxMDFjYzNuam51anE0emg4aSJ9.kVkD9VCQAN2o1anIODJIfg`

    request({url, json:true},(error,response) => {
        if(error){
            callback(`Error in request URL - ${error}`,undefined)
        } else if (response.body.features.length === 0){
            callback(`Location could not be found`,undefined)
        } else {
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}
// locationLookUp('turramurra',(error,data) => {
//     console.log('error',error)
//     console.log('data',data)
// })

module.exports = locationLookUp