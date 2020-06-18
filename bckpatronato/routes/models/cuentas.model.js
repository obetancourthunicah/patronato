const db = require('./db');

let cuentasColl;

module.exports = class {
  static async initModel(){
    if(!cuentasColl) {
      let _db = await db.getDB();
      console.log(_db);
      cuentasColl = await _db.collection('alumnos');
    }
    console.log("Aqui ", cuentasColl);
  }
  static async getCuentas(){
    if(cuentasColl){
      return await cuentasColl.find({});
    }
  }
}
