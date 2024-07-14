const { log } = require('../config/env.js')
module.exports = app => {

    const newLog = (user_id, logAction, logType, message) => {
        if(log){
            app.db('logs')
                .insert({
                    user_id: user_id,
                    log_action: logAction,
                    log_type: logType,
                    message: message,
                    timestamp: new Date()
                })
                .then(_ => _)
                .catch(error => console.log(error))
        }
    }

    const get = (req, res) => {
        app.db('logs')
            .select('*')
            .then(logs => res.json(logs))
            .catch(error => res.status(500).send(error))
    }

    return { newLog, get }
}