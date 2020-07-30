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

router.get('/facet/:page/:items' , async (req, res)=>{
  try{
    const {page, items} = req.params;
    let facetResult = await model.getFacet(parseInt(page), parseInt(items));
    console.log(facetResult);
    res.status(200).json(facetResult);
  }catch(e){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
});

router.get('/one/:id', async (req, res)=>{
  try{
      let {id} = req.params;
      let cuenta = await model.getOne(id);
      res.status(200).json(cuenta);
  }catch(err){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
}); //get one

router.get('/cuenta/:cuenta', async (req, res) => {
  try {
    let { cuenta } = req.params;
    let rcuenta = await model.getByCuenta(cuenta);
    res.status(200).json(rcuenta);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
}); //get one



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

router.put('/like/:id', async (req, res)=>{
  try{
    let { id } = req.params;
    const rlst = await model.like(id);
    res.status(200).json(rlst);
  }catch(err){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
});

router.put('/dislike/:id', async (req, res) => {
  try {
    let { id } = req.params;
    const rlst = await model.dislike(id);
    res.status(200).json(rlst);
  } catch (err) {
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
});

router.delete ('/del/:id', async (req, res)=>{
  try {
      const {id} = req.params;
      const result = await model.deleteOne(id);
      res.status(200).json(result);
  }catch(err){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
});

router.get('/warn', async (req, res)=>{
  try{
    let result = await model.getWarningAlumnos();
    res.status(200).json(result);
  }catch(err){
    console.log(err);
    res.status(500).json({ "Error": "Algo Sucedio Mal intentar de nuevo." });
  }
})



module.exports = router;
