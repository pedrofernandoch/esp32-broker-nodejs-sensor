const MQTT_TEMPERATURE_TOPIC = 'esp32/dht/temperature'
const MQTT_HUMIDITY_TOPIC = 'esp32/dht/humidity'
const GET_TEMP = 'GET_TEMP'
const GET_HUM = 'GET_HUM'
const SUCCESS = 'SUCCESS'
const ERROR = 'FAILURE'
const CREATE = 'CREATE'
const GET = 'GET'
const UPDATE = 'UPDATE'
const DELETE = 'DELETE'

module.exports = app => {
    return {
        mqttTopics: {
            MQTT_TEMPERATURE_TOPIC,
            MQTT_HUMIDITY_TOPIC
        },
        logType: {
            SUCCESS,
            ERROR,
        },
        logActions: {
            GET_TEMP,
            GET_HUM,
            CREATE,
            GET,
            UPDATE,
            DELETE
        }
    }
}