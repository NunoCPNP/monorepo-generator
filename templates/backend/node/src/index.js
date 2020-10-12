const cors = require('cors')
const dotenv = require('dotenv')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')

const PORT = process.env.PORT || 5000

//! Environment Variables
dotenv.config({ path: './config/config.env'})

const app = express()

//! Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//! Middlewares
app.use(express.json())
app.use(helmet())

//! Cord
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `http://localhost:${PORT}` }))
} else {
  app.use(cors({ origin: '' }))
}

//! Routes

//! Routes Middlewares

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))