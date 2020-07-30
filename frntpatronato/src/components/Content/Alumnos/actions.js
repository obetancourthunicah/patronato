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

export const obtenerAlumnosFacet = async (_page, items) => {
  const page = _page - 1;
  try {
    let { data } = await paxios.get(`/api/alumnos/facet/${page}/${items}`);
    return data;
  } catch (e) {
    throw (e);
  }
}

export const nuevoAlumno = async()=>{
  try{
    let { data } = await paxios.post("url", {cuenta:"","nombre":""});
  }catch(e){
    throw(e);
  }
}
