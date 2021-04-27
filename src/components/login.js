import React, { useState } from 'react';
import * as service from '../utils/serviceManager';
import { MMKV } from 'react-native-mmkv';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
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
import Loader from './loader';

function Login ({ setToken , loading , setLoading}){
  const styles = require('../styles/style');
  const [username , setUsername] = useState("");
  const [password , setPassword] = useState("");
  const [authenticated , setAuthenticated] = useState(false);
  const [error , setError] = useState(false);
  const [passwordSecurity , setPasswordSecurity] = useState(true);

  const onChangeText = (text) => {
    setUsername(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  const togglePasswordVisibility = () =>{
    setPasswordSecurity(!passwordSecurity);
  }

  const signIn = async () => {
    setLoading(true);
    setError(false);
    
    let response = await service.getToken(username , password);

    if(response != 'error' && response.data.token && response.data.usuario){
      setLoading(false);
      setAuthenticated(true);
      MMKV.set('token' , response.data.token);
      MMKV.set('idUsuario' , response.data.usuario.id);
      setToken(response.data.token);
    } else {
      setLoading(false);
      setError(true);
      setAuthenticated(false);
    }
  }

  return (
      <View style={[styles.container , {opacity: loading ? 0.8 : 1}]}>
        <Image style={styles.logo} source={require('../assets/images/scopesilogo.png')} />
        <TextInput style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={username}
          autoCapitalize='none'
          placeholder='Usuario'
        />
        <View style={styles.passwordContainer}>
          <TextInput 
            style={styles.input} 
            onChangeText={text => onChangePassword(text)} 
            value={password} 
            secureTextEntry={passwordSecurity}
            autoCapitalize='none'
            placeholder='Contraseña'
          />
          <Icon name={passwordSecurity ? 'eye' : 'eye-off'} style={styles.passwordIcon} size={20} onPress={() =>togglePasswordVisibility()}></Icon>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button , { opacity: username === '' || password === '' || loading ? 0.3 : 1}]}
            onPress={() => {Keyboard.dismiss(); signIn();}}
            accessibilityLabel="Ingresar en el sistema"
            disabled={username === '' || password === '' || loading}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
          {!authenticated && error && <Text style={{color:'#f0f0f0' , paddingTop:5}}>Usuario y/o contraseña incorrectos</Text>}
        <Loader loading={loading}></Loader>
        <StatusBar style="auto"/>
      </View>
  );
};

export default Login;
