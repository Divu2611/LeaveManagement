import httpService from "./httpService";

import config from '../config/config.json'

const url = config.apiEndPoint + "/api/employee/";

export function saveEmployee(employee){

    if(employee._id){
        const body = {...employee};
        delete body._id;
        return httpService.put(url + employee._id,body);
    }
    return httpService.post(url,employee);
}

export function getEmployee(id){
    return httpService.get(url + id);
}

export function deleteEmployee(id){
    return httpService.delete(url + id);
}

export default{
    saveEmployee,
    getEmployee,
    deleteEmployee
}