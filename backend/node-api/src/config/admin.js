const { shouldAuthenticate } = require('./env.js')
const errorMessages = require('../utils/errorMessages.js')

module.exports = middleware => {
    return (req, res, next) => {
        let messages
        if (req.headers.locale) {
            messages = errorMessages().locale[req.headers.locale]
            if (messages === undefined || Object.keys(messages).length == 0) throw `Locale ${req.headers.locale} not found, this language is not supported yet`
        } else {
            messages = errorMessages().locale.pt
        }
        try {
            if (shouldAuthenticate && req.user.admin !== true) {
                const message = messages.admin.USER_IS_NOT_ADMIN
                res.status(401).send(message)
            } else {
                middleware(req, res, next)
            }
        } catch (error) {
            res.status(400).send(error)
        }

    }
}