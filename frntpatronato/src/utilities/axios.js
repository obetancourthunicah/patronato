import axios from 'axios';

const publicaxios = axios.create();
publicaxios.defaults.headers.common['cache-control'] = "no-cache";
publicaxios.defaults.headers.post['Content-Type'] = "no-cache";
publicaxios.defaults.headers.put['Content-Type'] = "no-cache";

const privateaxios = axios.create();
privateaxios.defaults.headers.common['cache-control'] = "no-cache";
privateaxios.defaults.headers.post['Content-Type'] = "no-cache";
privateaxios.defaults.headers.put['Content-Type'] = "no-cache";

export const setJWT = (jwt)=>{
  privateaxios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
  //todo: set jwt to axios private instance
}

export const setUnAuthInterceptor =  ( logoutHandler)=>{
  privateaxios.interceptors.response.use(
    (response)=>{
      return response;
    },
    (error)=>{
      console.log(error);
      if(error.response){
        switch(error.response.status){
          case 401:
            logoutHandler();
            break;
          default:
            console.log(error);
        }
      }else{
        console.log(error);
      }
      return Promise.reject(error);
    }
  )
}


export const naxios = publicaxios;
export const paxios = privateaxios;

const localStorageAvailable = (
  ()=>{
    let t= "t";
    try{
      localStorage.setItem(t,t);
      localStorage.removeItem(t);
      return true;
    } catch(e){
      return false;
    }
  }
)()

const sessionStorageAvailable = (
  () => {
    let t = "t";
    try {
      sessionStorage.setItem(t, t);
      sessionStorage.removeItem(t);
      return true;
    } catch (e) {
      return false;
    }
  }
)()

export const getLocalStorage = (key)=>{
  if(localStorageAvailable){
    return localStorage.getItem(key);
  } else {
    return null;
  }
}

export const setLocalStorage = (key, value) => {
  if (localStorageAvailable) {
    localStorage.setItem(key, value);
    return true;
  } else {
    return false;
  }
}

export const removeLocalStorage = (key) => {
  if (localStorageAvailable) {
    localStorage.removeItem(key);
    return true;
  } else {
    return false;
  }
}

export const getSessionStorage = (key) => {
  if (sessionStorageAvailable) {
    return sessionStorage.getItem(key);
  } else {
    return null;
  }
}

export const setSessionStorage = (key, value) => {
  if (sessionStorageAvailable) {
    sessionStorage.setItem(key, value);
    return true;
  } else {
    return false;
  }
}

export const removeSessionStorage = (key) => {
  if (sessionStorageAvailable) {
    sessionStorage.removeItem(key);
    return true;
  } else {
    return false;
  }
}
