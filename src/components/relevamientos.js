import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

function Relevamientos ({ navigation }){
    const styles = require('../styles/style');
    const openRelevamiento = (key) => {
        navigation.navigate('Relevamiento' , {nombreRelevamiento : key});
    };

    return(
        <View style={styles.relevamientoContainer}>
            <FlatList
                data={[
                {key: 'Relevamiento 1'},
                {key: 'Relevamiento 2'},
                {key: 'Relevamiento 3'},

                ]}
                renderItem={({item}) =>   
                    <View style={[styles.buttonContainer , {alignSelf:'center'}]}>          
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {openRelevamiento(item.key)}}
                        accessibilityLabel="Ver relevamiento"
                    >
                        <Text style={styles.buttonText}>{item.key}</Text>
                    </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};

export default Relevamientos;