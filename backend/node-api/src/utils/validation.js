const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/

module.exports = app => {
    function existsOrError(value, msg) {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    function existsOrFalse(value) {
        if (!value) return false
        if (Array.isArray(value) && value.length === 0) return false
        if (typeof value === 'string' && !value.trim()) return false
        return true
    }

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch (msg) {
            return
        }
        throw msg
    }

    function equalsOrError(valueA, valueB, msg) {
        if (valueA !== valueB) throw msg
    }

    function validateEmail(email, msg) {
        if (!email.match(emailRegex)) throw msg
    }

    function validatePassword(password, msg) {
        if (!password.match(passwordRegex)) throw msg
    }

    function validateAndGetLocaleMessages(locale) {
        if(locale){
            const errorMessages = app.src.utils.errorMessages.locale[locale]
            if (errorMessages === undefined || Object.keys(errorMessages).length == 0) throw `Locale ${locale} not found, this language is not supported yet`
            return errorMessages
        }else{
            return app.src.utils.errorMessages.locale.pt
        }
    }

    return {
        existsOrFalse,
        existsOrError,
        notExistsOrError,
        equalsOrError,
        validateEmail,
        validatePassword,
        validateAndGetLocaleMessages
    }
}