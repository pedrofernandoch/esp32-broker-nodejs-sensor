module.exports = app => {
    const systemConstants = app.src.utils.systemConstants

    const getTemperature = async (req, res) => {
        const temperatureResponse = app.mqtt.getLastMessage(systemConstants.mqttTopics.MQTT_TEMPERATURE_TOPIC)
        req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.GET_TEMP,
            systemConstants.logType.SUCCESS,
            `Temperature retrieved: ${temperatureResponse}`
          ) : console.log('No user logged in');
        res.send(temperatureResponse)
    }

    const getHumidity = async (req, res) => {
        const humidityResponse = app.mqtt.getLastMessage(systemConstants.mqttTopics.MQTT_HUMIDITY_TOPIC)
        req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.GET_HUM,
            systemConstants.logType.SUCCESS,
            `Humidity retrieved: ${humidityResponse}`
          ) : console.log('No user logged in');
        res.send(humidityResponse)
    }

    return { getTemperature, getHumidity }
}