//Ip oficina 192.168.0.19, Ip Casa 192.168.0.5
const baseUrl = 'http://192.168.0.19:80/';
const api = baseUrl + 'api/';
export const googleApi = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
export const getToken = api + 'authenticate';
export const uploadFile = 'http://geoplanningmas.com/ar/v2/apifiles/file/fotos_app/'
export const getFiles = api + 'fotos_map/'; // armar el back y nuevo endpoint deberia ser algo como: fotos_map/usuario/fechaDeHoy/