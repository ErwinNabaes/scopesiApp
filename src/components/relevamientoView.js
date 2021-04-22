import React, { useEffect , useState } from 'react';
import MapView,{ PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ListItem,
  ScrollView
} from 'react-native';

function RelevamientoView ({ route , navigation }){
    const styles = require('../styles/style');
    const {nombreRelevamiento , direcciones} = route.params;
    const [markers , setMarkers] = useState(
        [
            {'name':'1','descripcion' : 'Av. Maipu 123', 'latitude': -34.588405740971545, 'longitude': -58.412517024426},
            {'name':'2', 'descripcion' : 'Av. Maipu 123', 'latitude': -34.617323, 'longitude': -58.3707557},
            {'name':'3', 'descripcion' : 'Av. Maipu 123', 'latitude': -34.5150007, 'longitude': -58.4883899},
            {'name':'4', 'descripcion' : 'Av. Maipu 123', 'latitude': -34.5130478, 'longitude': -58.4894351},
            {'name':'5', 'descripcion' : 'Av. Maipu 123', 'latitude': -34.5081249, 'longitude': -58.4922945}
        ]
    );
    const addresses  =
        [
            {id:'1', direccion : 'Av. Independencia 350, Buenos Aires', latitude: -34.617323, longitude: -58.3707557},
            {id:'2', direccion : 'Av. Independencia 250, Buenos Aires', latitude: -34.6173086, longitude: -58.3715366},
            {id:'3', direccion : 'Av. Santa Fe 3150, Buenos Aires', latitude: -34.5897146, longitude: -58.40949560000001},
            {id:'4', direccion : 'Av. 25 de mayo 450, Buenos Aires', latitude: -34.6025754, longitude: -58.37128929999999},
        ];

    const newEntry = () => {
        navigation.navigate('EntryView');
    };

    const openEntry = (item) => {
        navigation.navigate('EntryView' , {entryName: item.direccion});
    };

    useEffect(() => {
        navigation.setOptions({ headerTitle: nombreRelevamiento, });
    }, [])

    return(
        <View style={styles.flexAlignCenter}>
            {direcciones ?
            <View style={{width:'100%' , height:'100%', alignItems:'center'}}>
                <MapView
                    id={'map'}
                    provider={PROVIDER_GOOGLE}
                    style={{height: '80%' , width:'100%'}}
                    initialRegion={{
                    latitude: -34.61315,
                    longitude: -58.37723,
                    latitudeDelta: 0.9,
                    longitudeDelta: 0.4,
                    }}   
                >
                    {
                        markers.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                            title={marker.name}
                            description={marker.descripcion}
                        />
                        ))
                    }
                </MapView>
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
            </View>
            :
            <View style={{width:'100%' , height:'100%', alignItems:'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {newEntry()}}
                    accessibilityLabel="Agregar una direccion"
                >
                    <Text style={styles.buttonText}>Nueva entrada</Text>
                </TouchableOpacity>
                <Text style={[styles.fontColor , {alignSelf:'center' , marginTop: 10 , fontSize:16}]}>Entradas:</Text>
                <ScrollView style={{ width:'70%'}}>
                    {addresses.length != 0 
                        ?
                        addresses.map((item , index)=>(
                            <TouchableOpacity 
                                key={index}
                                style={styles.entryButton}
                                onPress={() => {openEntry(item)}}
                            >
                                <Text style={[styles.fontColor , {padding:10}]}>{item.direccion}</Text>
                            </TouchableOpacity>
                        ))
                        :
                            <Text style={[styles.fontColor , {alignSelf:'center', marginTop:30 }]}>No se encontraron entradas cargadas</Text>
                    }
                </ScrollView>
            </View>
            }
        </View>
    );
};

export default RelevamientoView;