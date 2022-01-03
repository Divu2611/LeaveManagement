import jwtDecode from 'jwt-decode';

import httpService from "./httpService";
import config from "../config/config.json";

const userURL = config.apiEndPoint + "/api/auth/";

const userToken = "token";
const empToken = "empToken";

export async function authenticate(credentials){
    const {data:{user,employee}} = await httpService.post(userURL,credentials);

    localStorage.setItem(userToken,user);
    localStorage.setItem(empToken,employee);

    const data = {
        user,
        employee
    };

    return data;
}

export async function authenticateEmployee(jwt){
    localStorage.setItem(empToken,jwt);
}

export function getCurrentEmployee(){
    try {
      const jwt = localStorage.getItem(empToken);
      return jwtDecode(jwt);
    } catch (error) {}
}

export function getCurrentUser(){
    try {
      const jwt = localStorage.getItem(userToken);
      return jwtDecode(jwt);
    } catch (error) {}
}

export function logout(){
    localStorage.removeItem(userToken);
    localStorage.removeItem(empToken);
}

export function loginAfterRegister(jwt){
    localStorage.setItem(userToken,jwt);
}

httpService.setJWT(getUserJwt(),getEmployeeJwt());

function getUserJwt(){
    return localStorage.getItem(userToken);
}

function getEmployeeJwt(){
    return localStorage.getItem(empToken);
}

export default{
    authenticate,
    authenticateEmployee,
    getCurrentUser,
    getCurrentEmployee,
    logout,
    loginAfterRegister
}