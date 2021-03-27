const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup hadnlebars engine location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory serve 
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Llorenç Isern'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Llorenç Isern'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        imgPath: '/img/robot.png',
        name: 'Llorenç Isern'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            }) 
        })
    })    
    
})

app.get('/products', (req, res) => { 

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    const location = 'Martorell'
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Llorenç Isern',
        errorMessage: 'Help article not found'
    })
})

app.get('/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Llorenç Isern',
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () =>{
    console.log('Sever is up on port 3000.')
})