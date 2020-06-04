// Funcion de Conmutador de Entidades del Api
var express= require('express');
var router = express.Router();

var secRoutes = require('./sec');
var mocionRoutes = require('./mocion');

router.use("/sec", secRoutes);
router.use("/mocion", mocionRoutes);

module.exports = router;
