import {paxios} from '../../../utilities/axios';

export const login = async (email, password)=>{
  try
  {
    const {data} = await paxios.post(
      "/api/sec/login",
      {
        email: email,
        pswd: password
      }
    );
    return data;
  }catch (e){
    throw(e);
  }
}
