const admin = require("./admin.js")
const { shouldAuthenticate } = require('./env.js')

module.exports = (app) => {
  //Test
  app.get("/", function (req, res) {
    res.send({ response: "Service is up" });
  })

  //Authentication
  app.post("/signin", app.src.api.auth.signin)
  app.post("/validateToken", app.src.api.auth.validateToken)

  //Users
  app
    .route("/users")
    .all(shouldAuthenticate ? app.src.config.passport.authenticate() : (req, res, next) => next())
    .post(admin(app.src.api.user.save))
    .get(admin(app.src.api.user.get))

  app
    .route("/users/:id")
    .all(shouldAuthenticate ? app.src.config.passport.authenticate() : (req, res, next) => next())
    .put(admin(app.src.api.user.save))
    .delete(admin(app.src.api.user.remove))

  //Sensors
  app
    .route("/temperature")
    .all(shouldAuthenticate ? app.src.config.passport.authenticate() : (req, res, next) => next())
    .get(app.src.api.sensors.getTemperature);

  //Humudity
  app
  .route("/humidity")
  .all(shouldAuthenticate ? app.src.config.passport.authenticate() : (req, res, next) => next())
  .get(app.src.api.sensors.getHumidity);  

  //Logs
  app
    .route("/logs")
    .all(shouldAuthenticate ? app.src.config.passport.authenticate() : (req, res, next) => next())
    .get(admin(app.src.api.log.get))
};