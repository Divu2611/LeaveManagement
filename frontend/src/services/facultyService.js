import httpService from "./httpService";

import config from "../config/config.json";

const url = config.apiEndPoint + "/api/faculty/";

export function saveFaculty(faculty){

    if(faculty._id){
        const body = {...faculty};
        delete body._id;
        return httpService.put(url + faculty._id,body);
    }
    return httpService.post(url,faculty)
}

export function getFaculty(id){
    return httpService.get(url + id);
}

export function getFaculties(){
    return httpService.get(url);
}

export function deleteFaculty(id){
    return httpService.delete(url + id);
}

export default {
    saveFaculty,
    getFaculty,
    getFaculties,
    deleteFaculty
}