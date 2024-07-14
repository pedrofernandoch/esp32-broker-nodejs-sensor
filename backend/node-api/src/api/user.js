const bcrypt = require("bcryptjs")
const { shouldAuthenticate } = require('../config/env.js')

module.exports = (app) => {
  const {
    existsOrError,
    equalsOrError,
    validateEmail,
    validatePassword,
    validateAndGetLocaleMessages,
  } = app.src.utils.validation;
  const systemConstants = app.src.utils.systemConstants;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const save = async (req, res) => {
    const user = { ...req.body };
    let updatePassword = false;
    if (req.params.id !== null && req.params.id !== undefined)
      user.id = req.params.id;

    if (!req.originalUrl.startsWith("/users")) user.admin = false;
    if (shouldAuthenticate && (!req.user || req.user.admin !== true)) user.admin = false;

    try {
      const messages = validateAndGetLocaleMessages(req.headers.locale).user
        .save;
      existsOrError(user.name, messages.NAME_NOT_INFORMED);
      existsOrError(user.email, messages.EMAIL_NOT_INFORMED);
      if (!user.id || user.password || user.confirmPassword) {
        existsOrError(user.password, messages.PASSWORD_NOT_INFORMED);
        existsOrError(
          user.confirmPassword,
          messages.CONFIRMATION_PASSWORD_NOT_INFORMED
        );
        equalsOrError(
          user.password,
          user.confirmPassword,
          messages.PASSWORDS_DO_NOT_MATCH
        );
        validatePassword(user.password, messages.INVALID_PASSWORD);
        updatePassword = true;
      }
      validateEmail(user.email, messages.INVALID_EMAIL);
      const usersFromDB = await app
        .db("users")
        .where({
          email: user.email,
        })
        .select("*");

      if (!user.id && user.id != 0) {
        if (usersFromDB && usersFromDB.length > 0)
          throw messages.USER_ALREADY_EXISTS;
      } else {
        if (usersFromDB && usersFromDB.length > 0) {
          usersFromDB.forEach((u) => {
            if (user.id != u.id) throw messages.USER_ALREADY_EXISTS;
          });
        }
      }
    } catch (error) {
      return res.status(400).send(error);
    }

    delete user.confirmPassword;
    if (!updatePassword) delete user.password;
    else user.password = encryptPassword(user.password);

    if (user.id || user.id == 0) {
      app
        .db("users")
        .update(user)
        .where({ id: user.id })
        .then(async (_) => {
          req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.UPDATE,
            systemConstants.logType.SUCCESS,
            `${Object.values(user).join(",")}`
          ) : console.log('No user logged in');
          res.status(204).send();
        })
        .catch(async (error) => {
          req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.UPDATE,
            systemConstants.logType.ERROR,
            error.toString()
          ) : console.log('No user logged in');
          res.status(500).send(error);
        });
    } else {
      app
        .db("users")
        .insert(user)
        .then(async (_) => {
          req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.CREATE,
            systemConstants.logType.SUCCESS,
            `${Object.values(user).join(",")}`
          ) : console.log('No user logged in');
          res.status(204).send();
        })
        .catch(async (error) => {
          req.user ? await app.src.api.log.newLog(
            req.user.id,
            systemConstants.logActions.CREATE,
            systemConstants.logType.ERROR,
            error.toString()
          ) : console.log('No user logged in');
          res.status(500).send(error);
        });
    }
  };

  const get = async (req, res) => {
    app
      .db("users")
      .select("id", "name", "email", "admin")
      .then(async (users) => {
        req.user ? await app.src.api.log.newLog(
          req.user.id,
          systemConstants.logActions.GET,
          systemConstants.logType.SUCCESS,
          `${users.length} users retrieved`
        ) : console.log('No user logged in');
        res.json(users);
      })
      .catch(async (error) => {
        req.user ? await app.src.api.log.newLog(
          req.user.id,
          systemConstants.logActions.GET,
          systemConstants.logType.ERROR,
          error.toString()
        ) : console.log('No user logged in');
        res.status(500).send(error);
      });
  };

  const remove = async (req, res) => {
    try {
      const messages = validateAndGetLocaleMessages(req.headers.locale).user
        .remove;
      existsOrError(req.params.id, messages.ID_NOT_INFORMED);
      const rowsDeleted = await app
        .db("users")
        .where({ id: req.params.id })
        .del();

      try {
        existsOrError(rowsDeleted, messages.USER_NOT_FOUND);
      } catch (error) {
        return res.status(400).send(error);
      }
      req.user ? await app.src.api.log.newLog(
        req.user.id,
        systemConstants.logActions.DELETE,
        systemConstants.logType.SUCCESS,
        `${rowsDeleted.length} users deleted`
      ) : console.log('No user logged in');
      res.status(204).send();
    } catch (error) {
      req.user ? await app.src.api.log.newLog(
        req.user.id,
        systemConstants.logActions.DELETE,
        systemConstants.logType.ERROR,
        error.toString()
      ) : console.log('No user logged in');
      res.status(500).send(error);
    }
  };

  return { save, get, remove };
};
