import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Loader from './loader';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import { MMKV } from 'react-native-mmkv';
import ImagePicker from 'react-native-image-picker';

function Home ({ setToken , loading , setLoading, navigation }){
    const styles = require('../styles/style');
    const logOut = () => {
        setLoading(true);
        MMKV.set('token' , '');
        MMKV.set('idUsuario' , '');
        setToken('');
        setLoading(false);
    };
    const openCamera = async () => {
        if (Platform.OS === "android" && !(await hasAndroidPermission())) {
            return;
        }else{
            navigation.navigate('Camera');
        }
    };
    const openFilePicker = () => {
      navigation.navigate('FilePicker');
  };
    const openFormsList = () => {
        navigation.navigate('Relevamientos');
    };

    const hasAndroidPermission = async () => {
        const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
        const audioPermission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO;
        const locationPermission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

        const hasPermission = await PermissionsAndroid.check(cameraPermission) 
                        && await PermissionsAndroid.check(audioPermission)
                        && await PermissionsAndroid.check(locationPermission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(cameraPermission) === 'granted'
                    && await PermissionsAndroid.request(audioPermission) === 'granted'
                    && await PermissionsAndroid.request(locationPermission) === 'granted';

        return status;
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                style={{paddingRight:5}}
                onPress={() => {logOut();}}
                >
                    <MaterialIcon name={'logout'} size={30}></MaterialIcon>
                </TouchableOpacity>
            )   
        });
    }, []);

    return(
        <View style={styles.container}>
            <StatusBar
                animated={true}
                backgroundColor="#343a40"
                barStyle={'default'}
                showHideTransition={'slide'}
                hidden={false}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {openCamera()}}
                    accessibilityLabel="Camara"
                >
                    <Text style={styles.buttonText}>Abrir c&aacute;mara</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {openFilePicker()}}
                    accessibilityLabel="Seleccione un archivo"
                >
                    <Text style={styles.buttonText}>Subir archivo</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {openFormsList()}}
                    accessibilityLabel="Relevamiento"
                >
                    <Text style={styles.buttonText}>Ver Relevamientos</Text>
                </TouchableOpacity>
            </View> */}
            <Loader loading={loading}></Loader>
        </View>
    );
};

export default Home;