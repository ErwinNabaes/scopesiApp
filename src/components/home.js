import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function Home ({ navigation }){
    const styles = require('../styles/style');
    const openCamera = () => {
        navigation.navigate('Camera');
    };
    const openFormsList = () => {
        navigation.navigate('Relevamientos');
    };
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
        </View>
    );
};

export default Home;