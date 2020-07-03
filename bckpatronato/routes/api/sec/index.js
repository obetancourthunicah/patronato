// Rutas de la Entidad de Seguridad
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

let secModel = require('./sec.model');

let  init = async ()=>{
  await secModel.initModel();
}
init();

router.post('/signin', async (req, res) => {
  try {
    var rslt = await secModel.addnew(req.body);
    console.log(rslt);
    res.status(200).json({ "msg": "Usuario Creado" });
  } catch (err) {
    res.status(500).json({ "error": "Algo Sucendió mal!!" });
  }
}
);

router.post('/login' , async(req, res)=>{
  try {
    var { email, pswd } = req.body;
    //Hacer validaciones aqui
    var user = await secModel.getByEmail(email);
    if (await secModel.comparePassword(pswd, user.password)) {
       const { email, roles, _id } = user;
       const jUser = { email, roles, _id };
       console.log(jUser);
       let token = jwt.sign(jUser, process.env.JWT_SECRET, {expiresIn: '120m'});
       res.status(200).json(
         {
           ...jUser, jwt: token
         }
       );
    } else {
      res.status(401).json({"error":"Credenciales Incorrectas"});
    }
  } catch (err) {
    res.status(500).json({ "error": "Algo Sucendió mal!!" });
  }
});


module.exports = router;
