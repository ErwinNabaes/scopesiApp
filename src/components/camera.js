import React, { Component, useEffect, useState } from 'react';
import Camera, { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

function OpenCamera({props , navigation}) {    
  const [
    { cameraRef, type },
    { takePicture , recordVideo, isRecording },
  ] = useCamera(props);
  const [mode , setMode] = useState('camera');

  const takePhoto = async () => {
    const data = await takePicture();

    let photo = {
      uri: data.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    const formData = new FormData();
    formData.append('file', photo);
    formData.append('idEmpresa', 25);
    formData.append('idUbicacion', 43673);

    let response = await fetch('http://192.168.0.19:80/api/fotos_map/uploadFile', 
    { 
      method: 'POST' , 
      headers: {'Accept': '*/*','Content-Type': 'multipart/form-data'},
      body: formData
    })
    .catch(function (error) {
      console.log('setNotifications error: ', error);
    })
    .then((response) => response.json());
    console.log(response);
    createAlert(response.fileDownloadUri);
  }

  const record = async () => {
    const data = await recordVideo({maxDuration:60});
    console.log(data);

    let video = {
      uri: data.uri,
      type: 'video/mp4',
      name: 'video.mp4',
    };
    
    const formData = new FormData();
    formData.append('file', video);
    formData.append('idEmpresa', 25);
    formData.append('idUbicacion', 43673);

    let response = await fetch('http://192.168.0.19:80/api/fotos_map/uploadFile', 
    { 
      method: 'POST' , 
      headers: {'Accept': '*/*','Content-Type': 'multipart/form-data'},
      body: formData
    })
    .then((response) => response.json())
    .catch(function (error) {
      console.log('setNotifications error: ', error);
      
    });
    console.log(response);
  }

  const stopRecord = () => {
    const data = cameraRef.current.stopRecording();
  }

  const closeCamera = async() => {
    navigation.navigate('Home');
  }

  const switchMode = () => {
    const modes = ['camera' , 'video'];
    setMode(modes[!modes.indexOf(mode) * 1]);
  }

  const createAlert = (data) =>
  Alert.alert(
    "Archivo subido correctamente",
    data,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        type={type}
        style={styles.view}
      > 
        <TouchableOpacity style={styles.closeButton} onPress={()=>closeCamera()} >
          <Icon name={"close"} style={styles.fontColor} size={35}/>
        </TouchableOpacity>
        <View style={styles.panelBottom}>
          <TouchableOpacity
            onPress={mode === 'camera' ? takePhoto : record}
            style={[styles.roundedButton , styles.capture]}
          >
            <Icon name={mode === 'camera' ? 'camera' : 'videocam'} style={styles.fontColor} size={35}/>

          </TouchableOpacity>
          <TouchableOpacity
              onPress={switchMode}
              style={[styles.roundedButton , styles.switchButton]}
            >
              <Icon name={mode === 'camera' ? 'videocam' : 'camera'} style={styles.fontColor} size={25}/>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={stopRecord}
              style={[styles.roundedButton , styles.stopButton]}
            >
              <Icon name={'stop'} style={{color:'red'}} size={25}/>
          </TouchableOpacity>
        </View>
      </RNCamera>
    </View>
  );

  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    view: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    panelBottom: {
      alignItems:'center',
      justifyContent:'center'
    },
    capture: {    
      width:80,
      height:80,
      marginBottom:15
    },
    closeButton: {
      alignSelf:'flex-end'
    },
    fontColor: {
      color: '#fff'
    },
    roundedButton:{
      alignItems:'center',
      justifyContent:'center',
      borderWidth:2,
      borderColor:'#3CD0AD',      
      borderRadius:50,
      backgroundColor:'rgba(52, 52, 52, 0.2)'
    },
    switchButton: {
      width:45,
      height:45,
      position: 'absolute',
      left:'20%'
    
    },
    stopButton: {
      width:45,
      height:45,
      position:'absolute',
      right:'20%'
    }
  });

  export default OpenCamera;