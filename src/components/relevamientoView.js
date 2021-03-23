import React, { useEffect } from 'react';

import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

function RelevamientoView ({ route , navigation }){
    const styles = require('../styles/style');
    const {nombreRelevamiento} = route.params;
    const openCamera = () => {
        navigation.navigate('Camera');
    };
    const openForm = () => {
        navigation.navigate('Encuesta');
    };

    useEffect(() => {
        navigation.setOptions({ headerTitle: nombreRelevamiento, });
    }, [])
    
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
                    onPress={() => {openForm()}}
                    accessibilityLabel="Relevamiento"
                >
                    <Text style={styles.buttonText}>Ver Encuesta</Text>
                </TouchableOpacity>
            </View>
            <Text>nombreRelevamiento: {JSON.stringify(nombreRelevamiento)}</Text>
        </View>
    );
};

export default RelevamientoView;