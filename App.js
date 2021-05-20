/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState , useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MMKV } from 'react-native-mmkv';
import 'react-native-gesture-handler';
import Login from './src/components/login';
import Home from './src/components/home';
import CameraView from './src/components/cameraView';
import Gallery from './src/components/gallery';
import Form from './src/components/form';
import Relevamientos from './src/components/relevamientos';
import RelevamientoView from './src/components/relevamientoView';
import EntryView from './src/components/entryView';
import FilePicker from './src/components/filePicker';
import CameraPreview from './src/components/cameraPreview';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

function App (){
  const [token, setToken] = useState(MMKV.getString('token') ? MMKV.getString('token') : '');
  const [loading, setLoading] = useState(false);
  const changeFile = (file) =>{
    console.log(file);
}

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {token ? (
        <>
        <Stack.Screen 
          name="Home"
          options={{ headerLeft: null, title:'Inicio' }}
        >
          {props => <Home {...props} setToken={setToken} loading={loading} setLoading={setLoading}></Home>}
        </Stack.Screen>

        <Stack.Screen 
          name="Camera"
          options={{headerShown: false}}
        >
          {props => <CameraView {...props} loading={loading} setLoading={setLoading}></CameraView>}
        </Stack.Screen>

        <Stack.Screen 
          name="CameraPreview"
          options={{headerShown: false}}
        >
          {props => <CameraPreview {...props} loading={loading} setLoading={setLoading}></CameraPreview>}
        </Stack.Screen>

        <Stack.Screen
          name="FilePicker"
        >
           {props => <FilePicker {...props} loading={loading} setLoading={setLoading}></FilePicker>}
        </Stack.Screen> 
        <Stack.Screen 
          name="Galería"
          component={Gallery}
        />

        <Stack.Screen 
          name="Relevamientos"
          component={Relevamientos}
          options={{ title: 'Seleccion de relevamientos' }}
        />

        <Stack.Screen 
          name="Encuesta"
          component={Form}
        />

        <Stack.Screen 
          name={"Relevamiento"}
          component={RelevamientoView}
          options={{ title: 'Detalles' }}
        />
        <Stack.Screen 
          name={"EntryView"}
          options={{ title: 'Nueva entrada' }}
        >
          {props => <EntryView {...props} loading={loading} setLoading={setLoading}></EntryView>}
        </Stack.Screen>
        </>
      ) : (
        <>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
        >
          {props => <Login {...props} setToken={setToken} loading={loading} setLoading={setLoading}></Login>}
        </Stack.Screen>
        </>
      )}
      </Stack.Navigator>
      <StatusBar
        animated={true}
        backgroundColor="#343a40"
        barStyle={'default'}
        showHideTransition={'none'}
        hidden={false}
      />
    </NavigationContainer>
  );
};

export default App;
