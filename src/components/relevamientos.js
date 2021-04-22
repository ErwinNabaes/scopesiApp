import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';

function Relevamientos ({ navigation }){
    const styles = require('../styles/style');
    const openRelevamiento = (item) => {
        navigation.navigate('Relevamiento' , {nombreRelevamiento : item.name , direcciones : item.address});
    };

    return(
        <View style={styles.flexJustifyCenter}>
            <FlatList
                data={[
                {name: 'Relevamiento 1', address: true},
                {name: 'Relevamiento 2', address: true},
                {name: 'Relevamiento 3', address: false},

                ]}
                renderItem={({item}) =>   
                    <View style={[styles.buttonContainer , {alignSelf:'center'}]}>          
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {openRelevamiento(item)}}
                        accessibilityLabel="Ver relevamiento"
                    >
                        <Text style={styles.buttonText}>{item.name}</Text>
                        <Text style={styles.buttonText}>{item.address}</Text>
                    </TouchableOpacity>
                    </View>
                }
                keyExtractor={item => item.name}
            />
        </View>
    );
};

export default Relevamientos;