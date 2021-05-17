import React, { useEffect, useState } from 'react';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { MMKV } from 'react-native-mmkv';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import Octicons from 'react-native-vector-icons/dist/Octicons';
import Loader from './loader';
import styles from '../styles/style';
import landscapeStyles from '../styles/landscapeStyles';

import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions
} from 'react-native';

function OpenCamera({loading , setLoading, changeFile , props , navigation}) {   
  const [mode , setMode] = useState('camera');
  const [isRecording , setIsRecording] = useState(false);
  const [flashState , setFlashState] = useState(false);
  const [duration , setDuration] = useState(null);
  const [dateNow , setDateNow] = useState(null);
  const [
    { cameraRef, type },
    { takePicture , recordVideo },
  ] = useCamera(props);
  const [ratioSelected , setRatioSelected] = useState(MMKV.getString('ratio') ? MMKV.getString('ratio') : '4:3');
  const [imageQuality , setImageQualityValue] = useState(MMKV.getNumber('imageQuality') ? MMKV.getNumber('imageQuality') : 0.5);
  const [videoQuality , setVideoQualityValue] = useState(MMKV.getString('videoQuality') ? MMKV.getString('videoQuality') : '480p');
  const [modalConfigState , setModalConfigState] = useState(false);
  const [isLandscape , setIsLandscape] = useState(Dimensions.get('window').width > Dimensions.get('window').height);
  const [geoCoordinates , setGeoCoordinates] = useState({lat: null , lng: null})

  const getCurrentLocation = () => {
    setLoading(true)
    Geolocation.getCurrentPosition(
      async info => {
        setGeoCoordinates({
          lat: info.coords.latitude,
          lng: info.coords.longitude
        });
        setLoading(false);
        Alert.alert('','Su ubicación fue actualizada.');
      },
      error => {
        setLoading(false);        
        switch(error.code){
          case 1:
            Alert.alert('Permiso denegado','La aplicación no tiene permisos para acceder a su ubicación, revise el administrador de aplicaciones.');
            break;
          case 2:
            Alert.alert('Posición no disponible','Por favor, active la ubicación de su dispositivo para utilizar esta función.');
            break;
          case 3:
            Alert.alert('Error', 'Se agotó el tiempo de espera de la solicitud de ubicación, revise su conexión.');
            break;
          default:
            Alert.alert(error.message);
        }
      },
      { enableHighAccuracy:true , timeout:20000 , maximumAge:1000 }
    );
  }

  const takePhoto = async () => {
    let exifCoordinate = {};

    if(geoCoordinates.lat && geoCoordinates.lng){
      exifCoordinate = { GPSLatitude: geoCoordinates.lat, GPSLongitude: geoCoordinates.lng };
    }

    const options = { quality: imageQuality , writeExif: exifCoordinate};
    const data = await takePicture(options);

    let photo = {
      uri: data.uri,
      type: 'image/jpeg',
    };

    if(data.uri){
      changeFile(photo);
    }
  }

  const record = async () => {
    setDateNow(new Date());
    setIsRecording(true);
    const options = { quality: videoQuality , maxDuration:60};
    const data = await recordVideo(options);
    setIsRecording(false);   

    let video = {
      uri: data.uri,
      type: 'video/mp4',
    };
    
    if(data.uri){
      changeFile(video);
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

  const setRatio = (value) =>{
    setRatioSelected(value);
    MMKV.set('ratio' , value);
  }

  const setImageQuality = (value) =>{
    setImageQualityValue(value);
    MMKV.set('imageQuality' , value);

  }

  const setVideoQuality = (value) =>{
    setVideoQualityValue(value);
    MMKV.set('videoQuality' , value);

  }

  const checkDimension = () =>{
    const state = Dimensions.get('window').width > Dimensions.get('window').height;
    setIsLandscape(state);
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

  useEffect(() => {
    Dimensions.addEventListener('change', checkDimension);

    return () => { 
      Dimensions.removeEventListener('change'); 
    }
  }, []);

  return (
    <View style={isLandscape ?  landscapeStyles.cameraContainer : styles.cameraContainer}>
      <View style={[{backgroundColor:'#000' , display: ratioSelected === '16:9' ? 'none' : 'flex'} , isLandscape ? {height:'100%', width: ratioSelected === '4:3' ? '7%' : '20%'}: {height: ratioSelected === '4:3' ? '7%' : '20%'}]}></View>
      <View style={isLandscape ? landscapeStyles.topPanel : styles.topPanel}>
        <TouchableOpacity
          onPress={() => setModalConfigState(true)}
          disabled={isRecording}
          style={{marginLeft:5}}
        >
          <Octicons name={"gear"} style={[styles.fontColor, {opacity: isRecording ? 0.3 : 1}]} size={25}/>
        </TouchableOpacity>
        <Text style={[styles.recordDuration , {display: mode === 'video' ? 'flex' : 'none'}]}>{duration}</Text>
        <TouchableOpacity     
          onPress={()=>closeCamera()}
          disabled={isRecording}
        >
          <Icon name={"close"} style={[styles.fontColor, {opacity: isRecording ? 0.3 : 1}]} size={30}/>
        </TouchableOpacity>
      </View>
      <View style={isLandscape ? landscapeStyles.bottomPanel : styles.bottomPanel}>
        <TouchableOpacity
          onPress={switchMode}
          style={[styles.roundedButton , {opacity: isRecording ? 0.3 : 1} , isLandscape ? landscapeStyles.switchButton : styles.switchButton]}
          disabled={isRecording}
        >
          <Icon name={mode === 'camera' ? 'videocam' : 'camera'} style={styles.fontColor} size={25}/>
        </TouchableOpacity>
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
          onPress={handleFlash}
          style={[styles.roundedButton , isLandscape ? landscapeStyles.flashButton : styles.flashButton]}
        >
          <Icon name={flashState ? 'flash' : 'flash-off'} style={styles.fontColor} size={25}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={[{ borderColor: geoCoordinates.lat && geoCoordinates.lng ? '#3CD0AD' : '#C00' } , isLandscape ? landscapeStyles.locationButton : styles.locationButton]}
        >
          <Icon name={'location-sharp'} style={styles.fontColor} size={25}/>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={()=>openGallery()}
          style={[styles.squaredButton , styles.folderButton]}
        >
          <Icon name={'images-sharp'} style={styles.fontColor} size={25}/>
        </TouchableOpacity> */}
      </View>

      <RNCamera
        ref={cameraRef}
        type={type}
        style={styles.cameraView}
        flashMode={flashState ? RNCamera.Constants.FlashMode.on : RNCamera.Constants.FlashMode.off}
        useNativeZoom={true}
        ratio={ratioSelected}
        playSoundOnCapture={true}
        playSoundOnRecord={true}
      > 
      </RNCamera>
      <View style={[{backgroundColor:'#000' , display: ratioSelected === '16:9' ? 'none' : 'flex'}, isLandscape ? {height:'100%',width: ratioSelected === '4:3' ? '13%' : '20%'} : {height: ratioSelected === '4:3' ? '13%' : '20%'}]}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfigState}
        onRequestClose={() => { setModalConfigState(false); } }
      >
        <View
          style={styles.modalConfigView}
        >
          <View style={styles.configView}>
          <Text style={[styles.fontColor , styles.configTitle]}>Configuraci&oacute;n</Text>
            <Text style={styles.configSubtitle}>Tamaño de imagen: </Text>
            <View style={styles.configSection}>
              <TouchableOpacity
                onPress={() => setRatio('1:1')}
                style={[styles.configButton , {backgroundColor: ratioSelected === '1:1' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>1:1</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRatio('4:3')}
                style={[styles.configButton , {backgroundColor: ratioSelected === '4:3' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>4:3</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setRatio('16:9')}
                style={[styles.configButton , {backgroundColor: ratioSelected === '16:9' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>16:9</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.configSubtitle}>Calidad de imagen: </Text>
            <View style={styles.configSection}>
              <TouchableOpacity
                onPress={() => setImageQuality(0.2)}
                style={[styles.configButton , {backgroundColor: imageQuality === 0.2 ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>Minima</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setImageQuality(0.5)}
                style={[styles.configButton , {backgroundColor: imageQuality === 0.5 ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>Baja</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setImageQuality(1)}
                style={[styles.configButton , {backgroundColor: imageQuality === 1 ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>Normal</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.configSubtitle}>Calidad de video: </Text>
            <View style={styles.configSection}>
              <TouchableOpacity
                onPress={() => setVideoQuality('480p')}
                style={[styles.configButton , {backgroundColor: videoQuality === '480p' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>480p</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVideoQuality('720p')}
                style={[styles.configButton , {backgroundColor: videoQuality === '720p' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>720p</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setVideoQuality('1080p')}
                style={[styles.configButton , {backgroundColor: videoQuality === '1080p' ? '#3CD0AD' : '#5d636b'}]}
              >
                <Text style={styles.fontColor}>1080p</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              onPress={()=>setModalConfigState(false)}
              style={styles.closeConfigButton}
            >
              <Text style={styles.fontColor}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loader loading={loading}></Loader>
      <StatusBar
        animated={true}
        backgroundColor="#343a40"
        barStyle={'default'}
        showHideTransition={'none'}
        hidden={true}
      />
    </View>
  );

};

export default OpenCamera;