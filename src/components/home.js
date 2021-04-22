import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Loader from './loader';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import { MMKV } from 'react-native-mmkv';

function Home ({ setToken , loading , setLoading, navigation }){
    const styles = require('../styles/style');
    const logOut = () => {
        setLoading(true);
        MMKV.set('token' , '');
        setToken('');
        setLoading(false);
    };
    const openCamera = () => {
        navigation.navigate('Camera');
    };
    const openFormsList = () => {
        navigation.navigate('Relevamientos');
    };

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
                    onPress={() => {openFormsList()}}
                    accessibilityLabel="Relevamiento"
                >
                    <Text style={styles.buttonText}>Ver Relevamientos</Text>
                </TouchableOpacity>
            </View>
            <Loader loading={loading}></Loader>
        </View>
    );
};

export default Home;