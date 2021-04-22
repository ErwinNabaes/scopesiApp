import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import { MMKV } from 'react-native-mmkv';

/* REQUEST INTERCEPTOR */
axios.interceptors.request.use(function (config) {
    const token = MMKV.getString('token');
    console.log(token);
    if (token) {
        const headers = {
            "Authorization": "Bearer " + token
        }
        config.headers = {...config.headers, ...headers};
    }
    return config;
});

/* RESPONSE INTERCEPTOR */
axios.interceptors.response.use(function (response) {

    return response;
}, function (error) {
    let errorMessage = {'error': true , 'message' : error}
    return errorMessage;
});

export const getToken = (username , password) => {
    let url = endpoints.getToken;

    return axios.post(url, {'username' : username, 'password' : password})
    .catch(function (error) {
        console.log('setNotifications error: ', error);
    })
    .then((response) => response);
}

export const uploadFile = (formData) =>{
    let url = endpoints.uploadFile;
    let config = { headers : {'Accept': '*/*','Content-Type': 'multipart/form-data'} }
    
    return axios.post(url, formData, config )
    .catch(function (error) {
        console.log('setNotifications error: ', error);
        return false;
    })
    .then((response) => response.data);
}

export const getFiles = (idEmpresa , idUbicacion) =>{
    let url = endpoints.getFiles + idEmpresa + '/' + idUbicacion;
    return axios.get(url)
    .catch(function (error) {
        console.log('setNotifications error: ', error);
    })
    .then((response) => response.data);
}

export const getAddressByCoordinates = (lat , lng) =>{
    let url = endpoints.googleApi + lat + ',' + lng + '&key=AIzaSyANGywbfxItEbdle738SiU-AVJGIjadVYM';
    return axios.get(url)
    .catch(function (error) {
        console.log('setNotifications error: ', error);
    })
    .then((response) => response.data);
    
}