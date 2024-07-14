const systemConstants = require('./systemConstants');
module.exports = app => {
    return {
        locale: {
            en: {
                auth: {
                    signin: {
                        EMAIL_OR_PASSWORD_NOT_INFORMED: 'Email or password not informed',
                        USER_NOT_FOUND: 'User not found',
                        INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password'
                    }
                },
                user: {
                    save: {
                        NAME_NOT_INFORMED: 'Name not informed',
                        EMAIL_NOT_INFORMED: 'Email not informed',
                        PASSWORD_NOT_INFORMED: 'Password not informed',
                        CONFIRMATION_PASSWORD_NOT_INFORMED: 'Confirmation password not informed',
                        PASSWORDS_DO_NOT_MATCH: 'Passwords do not match',
                        INVALID_PASSWORD: 'Password needs to have: uppercase letter, lowercase letter, a number and size between 6-20.',
                        INVALID_EMAIL: 'Invalid email',
                        USER_ALREADY_EXISTS: 'User already exists',
                    },
                    remove: {
                        ID_NOT_INFORMED: 'Id not informed',
                        USER_NOT_FOUND: 'User not found'
                    }
                },
                admin:{
                    USER_IS_NOT_ADMIN: 'User is not admin'
                }
            },
            pt: {
                auth: {
                    signin: {
                        EMAIL_OR_PASSWORD_NOT_INFORMED: 'E-mail ou senha não informados',
                        USER_NOT_FOUND: 'Usuário não encontrado',
                        INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha inválidos'
                    }
                },
                user: {
                    save: {
                        NAME_NOT_INFORMED: 'Nome não informado',
                        EMAIL_NOT_INFORMED: 'E-mail não informado',
                        PASSWORD_NOT_INFORMED: 'Senha não informada',
                        CONFIRMATION_PASSWORD_NOT_INFORMED: 'Senha de confirmação não informada',
                        PASSWORDS_DO_NOT_MATCH: 'Senhas não coincidem',
                        INVALID_PASSWORD: 'A senha precisa ter: letra maiúscula, letra minúscula, um número e tamanho entre 6-20 caracteres.',
                        INVALID_EMAIL: 'E-mail inválido',
                        USER_ALREADY_EXISTS: 'O usuário já existe',
                    },
                    remove: {
                        ID_NOT_INFORMED: 'Id não informado',
                        USER_NOT_FOUND: 'Usuário não encontrado'
                    }
                },
                admin:{
                    USER_IS_NOT_ADMIN: 'O usuário não é administrador'
                }
            }
        }
    }
}