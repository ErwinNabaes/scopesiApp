/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  StatusBar,
  TextInput,
  Image
} from 'react-native';

function Login ({ navigation }){
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [authenticated , setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const styles = require('../styles/style');

  const onChangeText = (text) => {
    setUsername(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  //Ip oficina 192.168.0.19, Ip Casa 192.168.0.5
  const signIn = async () => {
    let response = await fetch('http://192.168.0.19:80/api/authenticate', 
    { 
      method: 'POST' , 
      headers: {'Accept': 'application/json','Content-Type': 'application/json'},
      body: JSON.stringify({'username' : username, 'password' : password})
    })
    .catch(function (error) {
      console.log('setNotifications error: ', error);
    })
    .then((response) => response.json());
    if(response.token){
      setAuthenticated(true);
      setToken(response.token);
      navigation.navigate('Home');
    } else {
      setAuthenticated(false);
    }
  }

  return (
    <View style={styles.container}>
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
          style={styles.button}
          onPress={()=>signIn()}
          accessibilityLabel="Ingresar en el sistema"
        >
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
        {!authenticated && token != '' && <Text>Bad credentials</Text>}
      <StatusBar style="auto"/>
    </View>
  );
};

export default Login;
