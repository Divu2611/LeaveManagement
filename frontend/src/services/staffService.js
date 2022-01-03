import httpService from "./httpService";

import config from "../config/config.json";

const url = config.apiEndPoint + "/api/staff/";

export function saveStaff(staff){

    if(staff._id){
        const body = {...staff};
        delete body._id;
        return httpService.put(url + staff._id,body);
    }
    return httpService.post(url,staff)
}

export function getStaff(id){
    return httpService.get(url + id);
}

export function getStaffs(){
    return httpService.get(url);
}

export function deleteStaff(id){
    return httpService.delete(url + id);
}

export default {
    saveStaff,
    getStaff,
    getStaffs,
    deleteStaff
}