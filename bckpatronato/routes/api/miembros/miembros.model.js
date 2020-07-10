const db = require('../../dao/db');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');

let miembrosColl;
let coloniasColl;

module.exports = class {
  static async initModel() {
    if (!miembrosColl) {
      let _db = await db.getDB();
      //console.log(_db);
      miembrosColl = await _db.collection('miembros');
      coloniasColl = await _db.collection('colonias');
      /*if (process.env.ENSUREINDEX == "1") {
        console.log('Creando Indices de Miembros');
        await miembrosColl.createIndex({ "email": 1 }, { unique: true });
      }
      */
     if (process.env.ENSUREINDEX == "1") {
       console.log("Creando Indice para ubicacion con GEO capabilities");
       await coloniasColl.createIndex( {"ubicacion": "2dsphere" }, {"unique": true});
     }
      console.log("Coleccion de Miembros asignados");
      console.log("Coleccion de Colonias asignados");
      return;
    } else {
      return;
    }
  } //initModel

  static async addColonia(colonia, departamento, municipio, barrio_seguro, latitud, longitud, radio_km) {
    try {
      let newColonia = {
        colonia,
        departamento,
        municipio,
        barrio_seguro,
        ubicacion: {
          type:"Point",
          coordinates: [longitud, latitud ]
        },
        radio_km
      }
      let rslt = await coloniasColl.insertOne(newColonia);
      return rslt;
    }
    catch (err) {
      console.log(err);
      throw(err);
    }
   }

   static async inColonia(latitud, longitud) {
     try{
        let query = {
          ubicacion: {
            $near: {
              $geometry : { type: "Point", coordinates: [ longitud , latitud ] },
              $maxDistance: 10000,
            },
          }
        }
        let rslt = await coloniasColl.find(query);
        return await rslt.toArray();
      } catch (err){
        console.log(err);
        throw (err);
      }
   }
  /* 
    _id
    colonia: "",
    departamento: "",
    municipio : "",
    barrio_seguro : true,
    ubicacion : {
      type:"point",
      coordinate:[lat, long]
    },
    radio_km: 5


  */
} //class
