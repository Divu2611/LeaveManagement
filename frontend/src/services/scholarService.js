import httpService from "./httpService";

import config from "../config/config.json";

const url = config.apiEndPoint + "/api/scholar/";

export function saveScholar(scholar){

    if(scholar._id){
        const body = {...scholar};
        delete body._id;
        return httpService.put(url + scholar._id,body);
    }
    return httpService.post(url,scholar)
}

export function getScholar(id){
    return httpService.get(url + id);
}

export function getScholars(){
    return httpService.get(url);
}

export function deleteScholar(id){
    return httpService.delete(url + id);
}

export default {
    saveScholar,
    getScholar,
    getScholars,
    deleteScholar
}