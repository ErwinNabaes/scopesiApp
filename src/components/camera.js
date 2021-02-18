import React, { Component, useEffect } from 'react';
import Camera, { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

function OpenCamera({props , navigation}) {    
  const [
    { cameraRef, type },
    { takePicture },
  ] = useCamera(props);

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
    .then((response) => console.log(response.json()));
  };

  const closeCamera = async() =>{
    navigation.navigate('Home');
  }
    
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        type={type}
        style={styles.view}
      > 
        <TouchableOpacity style={styles.closeButton} onPress={()=>closeCamera()} >
          <Icon name={"close"} style={styles.iconColor} size={35}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={takePhoto}
          style={styles.capture}
        >
          <Icon name={"camera"} style={styles.iconColor} size={35}/>
        </TouchableOpacity>
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
    capture: {
      borderWidth:2,
      borderColor:'#3CD0AD',      
      width:80,
      height:80,
      backgroundColor:'rgba(52, 52, 52, 0.2)',
      borderRadius:50,
      marginBottom:15,
      alignItems:'center',
      justifyContent:'center',
      alignSelf:'center'
    },
    closeButton: {
      alignSelf:'flex-end'
    },
    iconColor: {
      color: '#3CD0AD',
    }
  });

  export default OpenCamera;