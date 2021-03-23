/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MMKV } from 'react-native-mmkv';
import 'react-native-gesture-handler';
import Login from './src/components/login';
import Home from './src/components/home';
import OpenCamera from './src/components/camera';
import Gallery from './src/components/gallery';
import Form from './src/components/form';
import Relevamientos from './src/components/relevamientos';
import RelevamientoView from './src/components/relevamientoView';


const Stack = createStackNavigator();

function App (){
  const [token, setToken] = useState(MMKV.getString('token') !== undefined ? MMKV.getString('token') : '');

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {token ? (
        <>
        <Stack.Screen 
          name="Home"
          component={Home}
          options={{headerLeft: null}}
        />
        <Stack.Screen 
          name="Camera"
          component={OpenCamera}
          options={{headerShown: false}}
        />
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
        </>
      ) : (
        <>
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
        >
          {props => <Login {...props} setToken={setToken}></Login>}
        </Stack.Screen>
        </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
