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
import OpenCamera from './src/components/camera';
import Gallery from './src/components/gallery';
import Form from './src/components/form';
import Relevamientos from './src/components/relevamientos';
import RelevamientoView from './src/components/relevamientoView';
import EntryView from './src/components/entryView';

const Stack = createStackNavigator();

function App (){
  const [token, setToken] = useState(MMKV.getString('token') ? MMKV.getString('token') : '');
  const [loading, setLoading] = useState(false);

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
          {props => <OpenCamera {...props} loading={loading} setLoading={setLoading}></OpenCamera>}
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
    </NavigationContainer>
  );
};

export default App;
