const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//define path for express config
const index=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set up handle bar engin
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(index))

app.get('',(req,res)=>{
  res.render('index',{
    title:'Weather app',
    name:'Megha'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Megha'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    title:'Help ',
    name:'Megha',
    msg:'Need help'
  })
})

app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'Address must be provided'
    })
  }
  geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
    if(error){
      return res.send({error})
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address
      })
    })
  })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*',(req,res)=>{
  res.render('404',{
    title:'404 Page',
    name:'Megha',
    errorMessage:'Help article not found'
  })
})

app.get('*',(req,res)=>{
  res.render('404',{
    title:'404 Page',
    name:'Megha',
    errorMessage:'Page not found'
  })
})

app.listen(3000,()=>{
  console.log('Server is up in 3000')
})