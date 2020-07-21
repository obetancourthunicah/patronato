import axios from 'axios';

export const getMocion = async () => {
  const url = '/api/mocion/';
  try{
    let result = await axios.get(url);
    return result;
  }
  catch(e){
    throw e;
  }
}
