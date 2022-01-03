import httpService from "./httpService";

import config from "../config/config.json";

const url = config.apiEndPoint + "/api/leaves/";

export function getLeaves(){
    return httpService.get(url);
}

export function getLeave(id){
    return httpService.get(url+id);
}

export default{
    getLeave,
    getLeaves
}