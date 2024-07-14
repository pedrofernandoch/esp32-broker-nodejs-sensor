const mqtt = require('mqtt')
const { mqttConn } = require('./env.js')
const systemConstants = require('../utils/systemConstants')

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const connectUrl = `mqtt://${mqttConn.host}:${mqttConn.port}`
let client = null

const mqttTopics = systemConstants().mqttTopics
const lastMessages = {}
for (const topic in mqttTopics) {
  lastMessages[topic] = ''
}

function startClient() {
  client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: mqttConn.username,
    password: mqttConn.password,
    reconnectPeriod: 1000,
  })

  client.on('connect', () => {
    console.log('Connected')
    client.subscribe(Object.values(mqttTopics), () => {
      console.log(`Subscribe to topics '${Object.values(mqttTopics)}'`)
    })
  })

  client.on('message', (topic, payload) => {
    //console.log('Received Message:', topic, payload.toString())
    lastMessages[topic] = payload.toString()
  })
}

function getLastMessage(topic) {
  return lastMessages[topic]
}

module.exports = { startClient, getLastMessage }