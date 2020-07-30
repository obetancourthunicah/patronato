// Primero obtenemos la clase de la base de datos. (Singleton)
const db = require('../../dao/db');
const ObjectId = require('mongodb').ObjectId;

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
    try{
      if(cuentasColl){
        let registro = await cuentasColl.find();
        return registro.toArray();
      }
      return [];
    } catch(err){
      console.log(err);
      return err;
    }
  }

  static async getFacet(page, poolNumber) {
    try {
      if (cuentasColl) {
        
        let registro = await cuentasColl.find();
        let totalDocs = await registro.count();
        const limiteInferior = page * poolNumber;
        registro.skip(limiteInferior);
        registro.limit(poolNumber);
        const alumnos = await registro.toArray();
        return {alumnos:alumnos, total:totalDocs};
      }
      return { alumnos: [], total: 0};
    } catch (err) {
      console.log(err);
      return err;
    }
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

  static async getOne(id) {
    try {
      let filter = { "_id": new ObjectId(id)};
      const result = await cuentasColl.findOne(filter);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async getByCuenta(cuenta) {
    try {
      let filter = { "cuenta": cuenta };
      const result = await cuentasColl.findOne(filter);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  } //get by Cuenta

  static async like(id) {
    try {
      let filter = {"_id": new ObjectId(id)};
      let update = {"$inc":{"like":1}, "$set":{"last_modified": new Date().getTime()}};
      const result = await cuentasColl.updateOne(filter,update);
      return result;
    }catch(err){
      console.log(err);
      return err;
    }
  }

  static async dislike(id) {
    try {
      let filter = { "_id": new ObjectId(id) };
      let update = { "$inc": { "dislike": 1 }, "$set": { "last_modified": new Date().getTime() } };
      const result = await cuentasColl.updateOne(filter, update);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  } //dislike

  static async deleteOne(id){
    try{
      let filter = {"_id": new ObjectId(id)};
      const result = await cuentasColl.deleteOne(filter);
      return result;
    }catch(err){
      console.log(err);
      return err;
    }
  }

  static async getWarningAlumnos(){
    try { 
      let filter = {"dislike": {"$gt":3}};
      const cursor = await cuentasColl.find(filter);
      const arrCuentas = await cursor.toArray();
      return arrCuentas;
    } catch (err){
      console.log(err);
      return err;
    }

  }

  /*
  $lt
  $lte
  $gt
  $gte
  $ne
  $or []
  $and []
  :
  */ 

} //class
