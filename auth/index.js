var LocalStrategy = require('passport-local').Strategy;
var senagram = require('senagram-client');
var config = require('../config')

var client = senagram.crearCliente(config.client)


exports.localStrategy = new LocalStrategy((username, password, done) => {
  client.autenticar(username, password, (err, token) => {
      if (err) {
          return done(null, false, {message: 'username and password not found'});
      }

      client.getUsuario(username, (err, user) => {
        if (err) {
            return done(null, false, { message: `ocurrio un error: ${err.message}`})
        }

        user.token = token;

        console.log(user.token)
        return done(null, user)
      })
  })
})

exports.serializeUser = function (user, done) {
    // llamamos el colback sin error para serializar el usuario user que esta completo
    done(null, {
        username: user.username,
        token: user.token
    })
}

exports.deserializeUser = function (user, done) {
    client.getUsuario(user.username, (err, usr) => {
        usr.token = user.token;
        done(err, usr);
    })
}