module.exports = {
    authSecret: process.env.AUTH_SECRET,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    apiPort: process.env.API_PORT,
    mqttConn: {
        host: process.env.MQTT_HOST,
        port: process.env.MQTT_PORT,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD
    },
    log: process.env.LOG == 'Y' || process.env.LOG == 'true' ? true : false,
    shouldAuthenticate: process.env.SHOULD_AUTHENTICATE == 'Y' || process.env.SHOULD_AUTHENTICATE == 'true' ? true : false
}