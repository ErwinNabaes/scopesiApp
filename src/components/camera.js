import React, { Component, useEffect, useState } from 'react';
import * as service from '../utils/serviceManager';
import Camera, { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import { MMKV } from 'react-native-mmkv';
import {
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

function OpenCamera({props , navigation}) {   
  const styles = require('../styles/style');
  const [mode , setMode] = useState('camera');
  const [isRecording , setIsRecording] = useState(false);
  const [flashState , setFlashState] = useState(false);
  const [duration , setDuration] = useState(null);
  const [dateNow , setDateNow] = useState(null);
  const [
    { cameraRef, type },
    { takePicture , recordVideo },
  ] = useCamera(props);

  const takePhoto = async () => {
    const data = await takePicture();

    if(MMKV.getNumber('fileNumber')){
      let number = MMKV.getNumber('fileNumber') + 1;
      MMKV.set('fileNumber' , number);
    }else{
      MMKV.set('fileNumber' , 1);
    }

    let name = MMKV.getNumber('fileNumber');

    let photo = {
      uri: data.uri,
      type: 'image/jpeg',
      name: `${name + '.jpg'}`,
    };

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('idEmpresa', 25);
    formData.append('idUbicacion', 43673);

    if(data.uri){
      confirmUpload(formData , photo);
    }
  }

  const record = async () => {
    setDateNow(new Date());
    setIsRecording(true);
    const data = await recordVideo({maxDuration:60});
    setIsRecording(false);

    if(MMKV.getNumber('fileNumber')){
      let number = MMKV.getNumber('fileNumber') + 1;
      MMKV.set('fileNumber' , number);
    }else{
      MMKV.set('fileNumber' , 1);
    }

    let name = MMKV.getNumber('fileNumber');

    let video = {
      uri: data.uri,
      type: 'video/mp4',
      name: `${name + '.mp4'}`,
    };
    
    const formData = new FormData();
    formData.append('file', video);
    formData.append('idEmpresa', 25);
    formData.append('idUbicacion', 43673);

    if(data.uri){
      confirmUpload(formData , video);
    }
  }

  const stopRecord = () => {
    const data = cameraRef.current.stopRecording();
  }

  const closeCamera = async() => {
    navigation.goBack();
  }
  
  const openGallery = async() => {
    navigation.navigate('Galería');
  }

  const switchMode = () => {
    const modes = ['camera' , 'video'];
    setMode(modes[!modes.indexOf(mode) * 1]);
  }

  const handleFlash = () =>{
    setFlashState(!flashState);

  }

  const uploadFile = async (formData) => {
    let response = await service.uploadFile(formData); 

    return response && !!response.fileDownloadUri;
  }

  const confirmUpload = (formData , file) => {
    Alert.alert(
      "¿Desea subir el siguiente archivo?",
      `Nombre de archivo: ${file.name}`,
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Si", onPress: async () => {
            let uploadState = await uploadFile(formData);
            uploadMessage(uploadState);
          }
        }
      ],
      { cancelable: false }
    );
  }

  const uploadMessage = (uploaded) => {
    let message = "";
    uploaded ? message = "El archivo se subio correctamente." : message = "Ocurrio un error al subir el archivo.";
    Alert.alert(
      "",
      message,
      [
        {
          text: "OK",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }

  useEffect(() => {
    let secTimer;
    if(isRecording){
      secTimer = setInterval( () => {
        let currentDate = new Date();
        let difference = currentDate.getTime() - dateNow.getTime();

        let counter = new Date("2021-03-01T00:00:00.000Z").getTime() + new Date(difference).getTime();
        counter = new Date(counter);

        let minutes = counter.getMinutes();
        let seconds = counter.getSeconds();
        setDuration(`${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`);
      },1000)
    }else{
      setDuration("00:00");
    }

    return () => clearInterval(secTimer);
  }, [isRecording]);

  return (
    <View style={styles.cameraContainer}>
      <RNCamera
        ref={cameraRef}
        type={type}
        style={styles.cameraView}
        flashMode={flashState ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        useNativeZoom={true}
        playSoundOnCapture={false}
        playSoundOnRecord={true}
      > 
        <View style={styles.topPanel}>
          <Text style={styles.invisibleItem}></Text>
          <Text style={[styles.recordDuration , {display: mode === 'video' ? 'flex' : 'none'}]}>{duration}</Text>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={()=>closeCamera()}
            disabled={isRecording}
          >
            <Icon name={"close"} style={[styles.fontColor, {opacity: isRecording ? 0.3 : 1}]} size={35}/>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomPanel}>
          <TouchableOpacity
            onPress={mode === 'camera' ? takePhoto : isRecording ? stopRecord : record}
            style={[styles.roundedButton , styles.capture]}
          >
            {mode === 'camera' ?
              <Icon name={'camera'} style={styles.fontColor} size={35}/> 
              : 
              isRecording ? 
                <Icon name={'stop'} style={{color:'red'}} size={35}/> 
                :
                <MaterialIcon name={'fiber-manual-record'} style={{color:'red'}} size={55}></MaterialIcon>
            }
          </TouchableOpacity>
          <TouchableOpacity
            onPress={switchMode}
            style={[styles.roundedButton , styles.switchButton , {opacity: isRecording ? 0.3 : 1}]}
            disabled={isRecording}
          >
            <Icon name={mode === 'camera' ? 'videocam' : 'camera'} style={styles.fontColor} size={25}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFlash}
            style={[styles.roundedButton , styles.flashButton]}
          >
            <Icon name={flashState ? 'flash-off' : 'flash'} style={styles.fontColor} size={25}/>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={()=>openGallery()}
            style={[styles.squaredButton , styles.folderButton]}
          >
            <Icon name={'images-sharp'} style={styles.fontColor} size={25}/>
          </TouchableOpacity> */}
        </View>
      </RNCamera>
    </View>
  );

};

export default OpenCamera;