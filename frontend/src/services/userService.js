import httpService from "./httpService";

import config from "../config/config.json";

const url = config.apiEndPoint + "/api/users";

export function register(user){
    return httpService.post(url,user);
}