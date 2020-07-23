import { naxios, paxios, setJWT } from '../../../utilities/axios';

export const getMocion = async () => {
  const url = '/api/mocion/';
  try{
    let result = await naxios.get(url);
    return result;
  }
  catch(e){
    throw e;
  }
}

export const getPrivateMocion = async () => {
  const url = '/api/mocion/private';
  try {
    let result = await paxios.get(url);
    return result;
  }
  catch (e) {
    throw e;
  }
}
