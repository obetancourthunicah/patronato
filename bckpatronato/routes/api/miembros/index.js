var express = require('express');
var router = express.Router();
var model = require('./miembros.model');

var initModel = async () => {
  await model.initModel();
}
initModel();

router.post('/new', async(req, res)=>{
  try{
    var { colonia, departamento, municipio, barrio_seguro, latitud, longitud, radio_km} = req.body;
    barrio_seguro = barrio_seguro && true;
    latitud = parseFloat(latitud);
    longitud = parseFloat(longitud);
    radio_km = parseInt(radio_km);
    var rslt = await model.addColonia(colonia, departamento, municipio, barrio_seguro, latitud, longitud, radio_km);
    res.status(200).json(rslt);
  } catch(err){
    res.status(500).json({"error":"algo salio mal"});
  }
});

router.get('/near/:lat/:log', async (req, res) => {
    try{
      let {lat, log} = req.params;
      lat = parseFloat(lat);
      log = parseFloat(log);
      var patronatos = await model.inColonia(lat, log);
      res.status(200).json(patronatos);
    }catch(err){
      res.status(500).json({ "error": "algo salio mal" });
    }
} ); // near

module.exports = router;
