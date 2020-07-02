const db = require('../../dao/db');
const ObjectId = require('mongodb').ObjectId;

let userColl;

module.exports = class {
  static async initModel(){
    if (!userColl) {
      let _db = await db.getDB();
      //console.log(_db);
      userColl = await _db.collection('usuarios');
      if (process.env.ENSUREINDEX == "1"){
        console.log('Creando Indices de Usuarios');
        await userColl.createIndex({"email":1},{unique:true});
      }
      console.log("Coleccion de Usuario asignados");
      return;
    } else {
      return;
    }
  } //initModel

}
