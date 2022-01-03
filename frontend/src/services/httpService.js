import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {

  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  
  if(!expectedError){
    toast.error("Something went wrong");
  }
  
  console.log("Hello World");
  return Promise.reject(error);
});

function setJWT(authToken,empToken){
  axios.defaults.headers.common["x-authToken"] = authToken;
  axios.defaults.headers.common["x-empToken"] = empToken;
}

export default {
    get: axios.get,
    post: axios.post,
    patch: axios.patch,
    put: axios.put,
    delete: axios.delete,
    setJWT
}