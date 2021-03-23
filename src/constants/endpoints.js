//Ip oficina 192.168.0.19, Ip Casa 192.168.0.5
const baseUrl = 'http://192.168.0.19:80/';
const api = baseUrl + 'api/';
export const getToken = api + 'authenticate';
export const uploadFile = api + 'fotos_map/uploadFile'; //debe apuntar al nuevo endpoint de walter
export const getFiles = api + 'fotos_map/'; // armar el back y nuevo endpoint deberia ser algo como: fotos_map/usuario/fechaDeHoy/