const express = require('express')
const router = require('../router/router')

const app = express()
app.use(express.json())
// const swaggerUi = require("swagger-ui-express")
// const {options} = require('./swagger-config')
// //connect swagger
// app.use('/api-docs',swaggerUi.serve)
// app.get('/api-docs', swaggerUi.setup(options));

app.use('/api',router)

module.exports = app