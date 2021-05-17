import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Loader from './loader';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import CameraPreview from './cameraPreview';

function FilePicker ({loading , setLoading, navigation }){
    const styles = require('../styles/style');
    const [filePath, setFilePath] = useState({});
    const changeFile = (file) =>{
      setFilePath(file);
    }
    const chooseFile = (type) => {
      let options = {
        mediaType: type,
        maxWidth: 1920,
        maxHeight: 1920,
        quality: 1,
        storageOptions: {
          skipBackup: true
          }
      };

      launchImageLibrary(options, (response) => {

        if (response.didCancel) {
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Cámara del dispositivo no disponible');
          return;
        } else if (response.errorCode == 'permission') {
          alert('La aplicación no tiene permisos');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);

        if(response.type !== 'image/jpeg'){
          response['type'] = 'video/mp4';
        }
        setFilePath(response);
      });
    };

    useEffect(() => {
      filePath.uri
      ?
      navigation.setOptions({ headerShown: false, })
      :
      navigation.setOptions({ headerTitle: 'Selección de archivo', headerShown:true});
    }, [filePath.uri]);

    return(
      filePath.uri 
      ?
      <CameraPreview loading={loading} setLoading={setLoading} file={filePath} changeFile={changeFile} fromGallery={true}></CameraPreview>
      :
        <View style={styles.container}>
            <View
                style={styles.filePickerView}
            >
                <TouchableOpacity
                    style={{alignItems:'center'}}
                    onPress={() => chooseFile('photo')}
                >
                    <View
                        style={[styles.roundedButton , styles.filePickerButton]}
                    >
                        <Icon name={"image"} style={styles.fontColor} size={30}/>
                    </View>
                    <Text style={styles.fontColor}>Im&aacute;gen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{alignItems:'center'}}
                    onPress={() => chooseFile('video')}
                >
                    <View
                        style={[styles.roundedButton , styles.filePickerButton]}
                    >
                        <Icon name={"video"} style={styles.fontColor} size={30}/>
                    </View>
                    <Text style={styles.fontColor}>Video</Text>
                </TouchableOpacity>
            </View>
            <Loader loading={loading}></Loader>
        </View>
    );
};

export default FilePicker;