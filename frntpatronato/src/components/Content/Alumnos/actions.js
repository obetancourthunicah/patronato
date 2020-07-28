import  { paxios } from '../../../utilities/axios';

export const obtenerAlumnos = async()=>{
  try{
    let { data } = await paxios.get('/api/alumnos');
    console.log(data);
    return data;
  }catch(e){
    throw(e);
  }
}
