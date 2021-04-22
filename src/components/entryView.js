import React, { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import * as service from '../utils/serviceManager';
import {
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import Loader from './loader';

function EntryView ({ loading , setLoading , route, navigation }){
    const styles = require('../styles/style');

    const openCamera = () => {
        navigation.navigate('Camera');
    };

    const openForm = () => {
        navigation.navigate('Encuesta');
    };

    const getCurrentLocation = () =>{
        setLoading(true);
        Geolocation.getCurrentPosition(
            async info => {
                console.log(info);
                let lat = info.coords.latitude;
                let lng = info.coords.longitude;
                
                let response = await service.getAddressByCoordinates(lat , lng);
                if(response){
                    setLoading(false);
                    Alert.alert("" , "Su ubicacion es: " + response.results[0].formatted_address);
                    
                }else{
                    setLoading(false);
                    Alert.alert("Error" , "Lo sentimos, ocurrio un error al obtener su ubicacion");
                }
            },
            error => {
                setLoading(false);
                Alert.alert(error.message);
            },
            { enableHighAccuracy:true , timeout:20000 , maximumAge:1000 }
        )
    };

    if(route.params){
        const {entryName} = route.params;
        useEffect(() => {
            navigation.setOptions({ headerTitle: entryName  });
        }, [])
    }

    return(
        <View style={[styles.container , {opacity: loading ? 0.8 : 1}]}>
            <Text style={[{fontSize:60} , styles.fontColor]}>#1</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button , { opacity: loading ? 0.3 : 1}]}
                    onPress={() => {getCurrentLocation()}}
                    accessibilityLabel="Obtener mi ubicacion"
                >
                    <Text style={styles.buttonText}>Mi ubicacion</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {openCamera()}}
                    accessibilityLabel="Camara"
                >
                    <Text style={styles.buttonText}>Abrir Camara</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {openForm()}}
                    accessibilityLabel="Relevamiento"
                >
                    <Text style={styles.buttonText}>Ver Encuesta</Text>
                </TouchableOpacity>
            </View>
            <Loader loading={loading}></Loader>
        </View>
    );
};

export default EntryView;