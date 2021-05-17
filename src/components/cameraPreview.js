import React from 'react';
import styles from '../styles/style'
import Icon from 'react-native-vector-icons/dist/Ionicons';
import * as service from '../utils/serviceManager';
import Loader from './loader';
import { MMKV } from 'react-native-mmkv';
import Video from 'react-native-video';
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

import {
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';


function CameraPreview ({loading , setLoading, file , changeFile , fromGallery}){

    const goBack = () =>{
        changeFile({ uri: '' , type: '' });
    }

    const acceptFile = () =>{
        if(file){
            confirmUpload(file);
        }else{
            Alert.alert('Error' , 'Ocurrio un error al procesar el archivo')
        }
    }

    const setFileNumber = (file) => {
        //check file number
        let date = MMKV.getNumber('date');
        let today = new Date().getDay();
        
        if(date && date !== today){
            MMKV.set('date' , today);
            MMKV.set('fileNumber', 0);
        }else{
            MMKV.set('date' , today);
        }

        //set file number
        let numberName = MMKV.getNumber('fileNumber');
        
        if(numberName){
            let newNumberName = numberName + 1;
            MMKV.set('fileNumber' , newNumberName);
        }else{
            MMKV.set('fileNumber' , 1);
        }
    
        let name = MMKV.getNumber('fileNumber');
    
        file = {...file , name : file.type == 'image/jpeg' ? name + '.jpg' : name + '.mp4'};

        return {file , name};
    };

    const uploadFile = async (file) => {
        //data required for upload
        let idUsuario = MMKV.getNumber('idUsuario');
        if(!idUsuario){
          return false;
        }

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let currentDate = date + '-' + month + '-' + year;

        //Set filename
        let newFile = setFileNumber(file);
        file = newFile.file;
        
        //Save a file in local storage
        if(!fromGallery){
            if (Platform.OS === "android" && !(await hasAndroidPermission())) {
                return;
            }
            CameraRoll.save(file.uri, {album: 'Auditapp/' + `auditoria-${newFile.name}`});
        }

        const formData = new FormData();
        formData.append('archivo', file , file.name);
      
        let response = await service.uploadFile(formData , idUsuario , currentDate , file.name); 
        
        return {file , status: response && response.status === 'ok'};
    }
    
    const hasAndroidPermission = async () => {
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        return status === 'granted';
    }

    const savePicture = async (file) => {
        let response;
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }
        
        // let newFile = setFileNumber(file);
        // file = newFile.file;

        // await CameraRoll.save(file.uri, { album: 'Auditapp/' + `auditoria-${newFile.name}`})
        // .then(async r => {
        //     response = {file , status: true , folderName:`auditoria-${newFile.name}`};

        // })
        await CameraRoll.save(file.uri, { album: 'Auditapp'})
        .then(async r => {
            response = {file , status: true , folderName:'Auditapp'};

        })
        .catch((err) => {
            response = {file , status: false};

        });

        return response;
    };

    const uploadMessage = (uploaded , fileName) => {
        setLoading(false);
        let message = "";
        uploaded ? message = "El archivo se subio correctamente." : message = "Ocurrio un error al subir este archivo.";
        Alert.alert(
          "Archivo: " + fileName,
          message,
          [
            {
              text: "OK",
              onPress: goBack,
              style: "cancel"
            }
          ],
          { cancelable: true }
        );
      }

    const confirmUpload = (file) => {
        fromGallery
        ? 
            Alert.alert(
                "" ,
                "¿Desea subir el archivo?", 
                [
                    {
                        text:'Cancelar',
                        style:'cancel'
                    },
                    { text: "Subir", onPress: async () => {
                        setLoading(true);
                        let response = await uploadFile(file);
                        uploadMessage(response.status , response.file.name);
                        }
                    }
                ])
        :
            Alert.alert(
                "",
                '¿Que desea hacer con su archivo?',
                [
                    {
                        text: "Cancelar",
                        style: "cancel"
                    },
                    { text: "Guardar", onPress: async () => {
                        setLoading(true);
                        let response = await savePicture(file);
                        setLoading(false);
                        
                        response.status
                        ? 
                        Alert.alert(
                            '' ,
                            `El archivo se ha guardado exitosamente en: ${response.folderName}`,
                            [
                                {
                                text: "OK",
                                onPress: goBack,
                                style: "cancel"
                                }
                            ],
                        )
                        :
                        Alert .alert('Error' , 'Ocurrio un error al intentar guardar su archivo');

                        }
                    },
                    { text: "Subir", onPress: async () => {
                        setLoading(true);
                        let response = await uploadFile(file);
                        uploadMessage(response.status , response.file.name);
                        }
                    }
                ]
            );
    }

    return(
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor:'#000'}}>
            {
                file.type === 'video/mp4'  
                ?
                <Video
                    source={{ uri: file.uri}}
                    style={styles.video}
                    controls={false}
                    repeat={true}
                    resizeMode={'cover'}
                ></Video>
                :
                <Image
                    source={{ uri: file.uri }}
                    style={styles.image}
                ></Image>
            }
            <View style={{position:'absolute', bottom:'3%',left:'25%', flexDirection:'row', justifyContent:'space-between', width:'50%'}}>
                <TouchableOpacity
                    onPress={goBack}
                    style={styles.cancelButton}
                >
                    <Icon name={"close"} style={styles.fontColor} size={30}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={acceptFile}
                    style={styles.acceptButton}
                >
                    <Icon name={"checkmark-sharp"} style={styles.fontColor} size={30}/>
                </TouchableOpacity>
            </View>
            <Loader loading={loading}></Loader>
        </View>
    );
}

export default CameraPreview;