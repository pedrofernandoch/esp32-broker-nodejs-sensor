require('dotenv').config()
const { apiPort } = require('./src/config/env.js')
const express = require('express')
const cors = require('cors')
const mqtt = require('./src/config/mqtt.js')
const consign = require('consign')
const db = require('./src/config/db')
const app = express()
const API_PORT = apiPort || 8323

app.db = db
app.mqtt = mqtt
app.mqtt.startClient()
app.use(express.json())
app.use(cors())

consign()
    .include('./src/config/passport.js')
    .then('./src/utils/validation.js')
    .then('./src/utils/systemConstants.js')
    .then('./src/utils/errorMessages.js')
    .then('./src/api')
    .then('./src/config/routes.js')
    .into(app)

app.listen(API_PORT, () => {
    console.log("Backend running...")
})