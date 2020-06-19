const express = require('express');
let router = express.Router();
const model = require('./cuentas.model');

const init = async ()=>{
    await model.initModel();
}
init();

router.get('/', async (req, res)=>{
  try {
    let alumnos = await model.getAll();
    res.status(200).json(alumnos);
  } catch (err) {
    console.log(err);
    res.status(500).json({"Error":"Algo Sucedio Mal intentar de nuevo."});
  }
}); // get /

router.post('/new', async (req, res)=>{
  try {
    let {cuenta, nombre } = req.body;
    const rslt = await model.addOne(cuenta, nombre);
    res.status(200).json(rslt);
  } catch(err){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
});// post /new

module.exports = router;
