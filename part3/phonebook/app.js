require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/routes.js')
const errors = require('./controllers/errorController.js')
const cors = require('cors')
const mongoose = require('mongoose') 

const app = express()

app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

app.use('/', routes)
app.use(errors.unknownEndpoint)
app.use(errors.errorHandler)

mongoose.set('strictQuery', false)

const url = process.env.MONGOLAB_URI


mongoose.connect(url)
    .then(result => {
        app.listen(3001, () => {
            console.log("Server running on port 3001");
        })
    })
    .catch((error) => {
        console.log('error connecting to MondoDB:', error.message)
    })
