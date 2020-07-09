// Funcion de Conmutador de Entidades del Api
var express= require('express');
var router = express.Router();
var passport = require('passport');
var passportJWT = require('passport-jwt');

var extractJWT = passportJWT.ExtractJwt;
var strategyJWT = passportJWT.Strategy;

passport.use( 
  new strategyJWT(
    {
        jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    (payload, next)=>{
      var user = payload;
      console.log(user);
      return next(null, user);
    }
  )
)

var secRoutes = require('./sec');
var {pub, priv} = require('./mocion');
var alumnosRoutes = require('./alumnos');
var patronatosRoutes = require('./miembros');

//publicas no requieres estar autenticados para ser consumidos
router.use("/sec", secRoutes);
router.use("/mocion", pub );
const jwtAuthMiddleware = passport.authenticate('jwt', {session:false});

//privadas
router.use("/mocion", jwtAuthMiddleware , priv);
router.use("/alumnos", jwtAuthMiddleware ,alumnosRoutes);
router.use("/patronatos", jwtAuthMiddleware, patronatosRoutes);

module.exports = router;
