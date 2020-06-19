// Primero obtenemos la clase de la base de datos. (Singleton)
const db = require('../../dao/db');

// Definimos Variables que contendran punteros hacia las colecciones
let cuentasColl; // VB Variable Globales | Cloujure
//let notasColl;

// NOTA: LOS MODELOS DE DATOS SON CLASES QUE CONTIENEN SOLAMENTE METODOS ESTÁTICOS
module.exports = class {
  // initModel 
  static async initModel(){
    if(!cuentasColl) {
      let _db = await db.getDB();
      //console.log(_db);
      cuentasColl = await _db.collection('alumnos');
      console.log("Coleccion de Alumnos asignados");
      return;
    }else{
      return;
    }
  }

  static async getAll(){
    if(cuentasColl){
      let registro = await cuentasColl.find();
      return registro.toArray();
    }
    return [];
  }

  static async addOne( cuenta, nombre ) {
    try{
      const newAlumno = {cuenta:cuenta, nombre:nombre};
      const result = await cuentasColl.insertOne(newAlumno);
      return result;
    }catch(err){
      console.log(err);
      return err;
    }
  }

} //class
