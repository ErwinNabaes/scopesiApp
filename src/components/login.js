/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import * as service from '../utils/serviceManager';
import { MMKV } from 'react-native-mmkv';
import {
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Keyboard,
  Modal
} from 'react-native';

function Login ({ setToken }){
  const styles = require('../styles/style');
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [authenticated , setAuthenticated] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error , setError] = useState(false);

  const onChangeText = (text) => {
    setUsername(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const signIn = async () => {
    setLoader(true);
    setError(false);
    
    let response = await service.getToken(username , password);
 
    if(response != 'error' && response.data.token){
      setLoader(false);
      setAuthenticated(true);
      MMKV.set('token' , response.data.token);
      setToken(response.data.token);
    } else {
      setLoader(false);
      setError(true);
      setAuthenticated(false);
    }
  }

  return (
      <View style={[styles.container , {opacity: loader ? 0.3 : 1}]}>
        <Image style={styles.logo} source={require('../assets/images/scopesilogo.png')} />
            <TextInput style={styles.input}
              onChangeText={text => onChangeText(text)}
              value={username}
              autoCapitalize='none'
              placeholder='Usuario'
            />
            <TextInput 
              style={styles.input} 
              onChangeText={text => onChangePassword(text)} 
              value={password} 
              secureTextEntry={true}
              autoCapitalize='none'
              placeholder='Contraseña'
            />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button , { opacity: username === '' || password === '' || loader ? 0.3 : 1}]}
            onPress={() => {Keyboard.dismiss(); signIn();}}
            accessibilityLabel="Ingresar en el sistema"
            disabled={username === '' || password === '' || loader}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
          {!authenticated && error && <Text style={{color:'#f0f0f0' , paddingTop:5}}>Usuario y/o contraseña incorrectos</Text>}
        <Modal
          animationType="slide"
          transparent={true}
          visible={loader}
        >
          <View style={styles.modalView}>
              <ActivityIndicator size={50} style={styles.loader} animating={loader} color="#3CD0AD"></ActivityIndicator>
              <Text>Cargando...</Text>
          </View>
        </Modal>
        <StatusBar style="auto"/>
      </View>
  );
};

export default Login;
