const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('/Users/georgeliu/Documents/projects/udemy-nodejs-course/web-server/src/utils/forecast.js')
const geocode = require('/Users/georgeliu/Documents/projects/udemy-nodejs-course/web-server/src/utils/geocode.js')

const app = express()
const port = process.env.PORT || 3000


app.set('view engine', 'hbs')
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req, res) => {
    res.render('index',{
        title:'Weather app',
        name:'George'
    })
})

app.get('/products',(req, res) => {
    if(!req.query.name) {
        return console.log('Please enter a search term.')
    }
    console.log(req.query)
    res.render('products',{
        title:'Products',
        name:'George'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title:'About me',
        name:'CG'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help page!',
        name:'CG'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter an address'
        })
    }
    const searchLocation = req.query.address
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send('Location not found')
        }
        //const lat = data.latitude
        //const long = data.longitude
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                res.send('not working')
            } else {
                res.send({searchLocation,forecastData})
            }
        })
        // forecast(data.longitude,data.latitude,(error,forecastData)=>{
        //     if(error){
        //         return res.send(error)
        //     }
        // })
    })
})
// app.get('/weather',(req,res) => {
//     if(!req.query.address) {
//         return res.send({
//             error: 'Please enter an address'
//         })
//     }
//     res.send([{
//         query:req.query.address,
//         location:'Turramurra',
//         State:'NSW',
//         Country:'Australia',
//         Temperature: `15'C`,
//         Humidity:`58%`,
//         Wind:`4km/h`
//     }])
// })

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'Help pages not found 😅',
        name:'CG'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'Page not found 😅',
        name:'CG'
    })
})

app.listen(port,() => {
    console.log(`Server is up on ${port}`)
})