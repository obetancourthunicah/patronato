var express = require('express');
var router = express.Router();

var cuentasModel = require('./models/cuentas.model');
cuentasModel.initModel();

console.log(cuentasModel.getCuentas());

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
