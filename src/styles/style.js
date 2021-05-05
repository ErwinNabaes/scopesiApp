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
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    fontColor: {
      color: '#fff'
    }, 
    textCenter: {
      justifyContent:'center',
      alignSelf:'center'
    },

  /*-----------Login styles-----------*/
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
    passwordContainer:{
      flexDirection:'row', 
      alignItems: 'center'
    },
    passwordIcon:{
      color:'#FFF',
      position: 'absolute',
      right: -30,
      top: 20
    },

    /*-----------Camera styles-----------*/
    cameraContainer: {
      flex: 1
    },
    cameraView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    topPanel: {
      justifyContent:'space-between',
      alignItems:'center',
      flexDirection:'row'
    },
    bottomPanel: {
      alignItems:'center',
      justifyContent:'center'
    },
    capture: {    
      width:80,
      height:80,
      marginBottom:15
    },
    roundedButton:{
      alignItems:'center',
      justifyContent:'center',
      borderWidth:2,
      borderColor:'#3CD0AD',      
      borderRadius:50,
      backgroundColor:'rgba(52, 52, 52, 0.2)'
    },
    squaredButton: {
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderColor:'#f0f0f0', 
      borderRadius:2,     
      backgroundColor:'rgba(52, 52, 52, 0.2)'
    },
    switchButton: {
      width:45,
      height:45,
      position: 'absolute',
      right:'25%'
    
    },
    flashButton: {
      width:45,
      height:45,
      position:'absolute',
      left:'25%'
    },
    recordDuration: {
      color:'#FFF',
      fontSize:16,
      borderWidth:2,
      borderColor:'#3CD0AD',      
      borderRadius:30,
      textAlign:'center',
      paddingHorizontal:5,
      paddingTop:5,
    },   
    folderButton: {
      width:40,
      height:40,
      position:'absolute',
      right:'4%'
    },
    modalConfigView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    configView: {
      width:'85%',
      backgroundColor: '#343a40',
      borderRadius: 4
    },
    configButton: {
      width: 80,
      height:30, 
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 3,
      marginVertical:10
    },
    closeConfigButton: {
      width:50,
      height:25, 
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 3,
      alignSelf:'flex-end',
      marginRight: '2%',
      marginBottom: '1%',
      backgroundColor:'#3CD0AD'
    },
    
    /*-----------relevamientos styles-----------*/
    flexJustifyCenter: {
      flex: 1,
      backgroundColor: '#343a40',
      justifyContent: 'center',
    },

    /*-----------relevamientoView styles-----------*/
    flexAlignCenter: {
      flex: 1,
      backgroundColor: '#343a40',
      alignItems: 'center'
    },
    entryButton:{
      backgroundColor:'#5b6064',
      margin:10,
      borderRadius:4
    },
  });