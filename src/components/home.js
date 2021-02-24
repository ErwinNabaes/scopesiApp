import React, { useState } from 'react';

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
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>openCamera()} >
                <Text style={styles.text}>Abrir Camera</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;