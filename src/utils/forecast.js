const request =require('postman-request')

const forecast=(latitude,longitude,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=a9cea6f4e6b9ac559aff7d0bc701f5e3&query='+latitude+','+longitude+'&units=m'
  request({url,json:true},(error,{body})=>{
    if(error){
      callback('Unable to connect to weather service!!')
    }else if(body.error){
      callback('Unable to find location')
    }else{
      callback(undefined,
        // {
        // description:body.current.weather_descriptions[0],
        // temperature:body.current.temperature,
        // feelslike:body.current.feelslike,
        // lat:body.location.lat,
        // lon:body.location.lon,
        // }
        body.current.weather_descriptions[0]+'. It is Currently '+body.current.temperature+' degree out. If feels like '+body.current.feelslike+' degree. The humidity is '+body.current.humidity
      )
    }
  })
}

module.exports=forecast