const app = require('./app.js')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})