const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const usersRouter = require('./controllers/userRouter')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const { MONGODB_URI } = require('./utils/config')
const mongoose = require('mongoose')
const logInRouter = require('./controllers/loginRouter')
mongoose.set('strictQuery', false)

logger.info('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', logInRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

if (process.env.NODE_ENV === 'test') {  
	const testingRouter = require('./controllers/testingRouter')  
	app.use('/api/testing', testingRouter)
}


module.exports = app