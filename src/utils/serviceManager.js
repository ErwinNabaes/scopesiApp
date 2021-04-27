import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import { MMKV } from 'react-native-mmkv';

/* REQUEST INTERCEPTOR */
axios.interceptors.request.use(function (config) {
    const token = MMKV.getString('token');
    
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

export const uploadFile = (formData , idUsuario, folder , fileName) =>{
    let url = endpoints.uploadFile + idUsuario + '/' + folder + '/' + fileName;
    console.log(url);
    
    return axios.post(url, formData)
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