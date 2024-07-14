const { authSecret } = require('../config/env.js')
const jwt = require('jwt-simple')
const bcrypt = require('bcryptjs')

module.exports = app => {
    const { validateAndGetLocaleMessages } = app.src.utils.validation

    const signin = async (req, res) => {
        try {
            const messages = validateAndGetLocaleMessages(req.headers.locale).auth.signin

            if (!req.body.email || !req.body.password) {
                return res.status(400).send(messages.EMAIL_OR_PASSWORD_NOT_INFORMED)
            }

            const user = await app.db('users')
                .where({ email: req.body.email })
                .first()

            if (!user) return res.status(400).send(messages.USER_NOT_FOUND)
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if (!isMatch) return res.status(401).send(messages.INVALID_EMAIL_OR_PASSWORD)

            const now = Math.floor(Date.now() / 1000)

            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
                iat: now,
                exp: now + (60 * 60 * 24)
            }

            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (error) {
            console.log('error', error)
        }

        res.send(false)
    }

    return { signin, validateToken }
}