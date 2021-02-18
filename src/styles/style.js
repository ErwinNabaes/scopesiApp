'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#343a40',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    buttonContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '70%'
    },
    button: {
      alignItems: 'center',
      height: 40,
      marginTop: 10,
      backgroundColor:'#3CD0AD',
      padding: 8,
      borderRadius: 10
    },
    buttonText: {
      color: 'white',
      fontSize: 17
    },
    input: {
      borderRadius:10,
      backgroundColor:'#ffffff',
      height: 40,
      width:'70%',
      borderColor: 'gray',
      marginTop: 10,
      borderWidth: 1,
      padding: 5,
    },
    logo: {
      marginBottom:'10%',
      width:300,
      height:70,
    },
    text:{
      color:'#ffffff'
    }
  });