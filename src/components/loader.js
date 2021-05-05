import React from 'react';
import {
View,
ActivityIndicator,
Modal
} from 'react-native';
 
function Loader ({loading}){ 
    const styles = require('../styles/style');

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={loading}
        >
        <View style={styles.modalView}>
            <View style={{width:65 , height:65 , backgroundColor:'#272727' , alignItems:'center' , justifyContent:'center' , borderRadius:50}}>
                <ActivityIndicator size={30} style={styles.loader} animating={loading} color="#3CD0AD"></ActivityIndicator>
            </View>
        </View>
        </Modal>
    );
};
 
export default Loader;
 