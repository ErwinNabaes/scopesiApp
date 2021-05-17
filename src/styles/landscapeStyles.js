'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        flexDirection:'row'
    },
    topPanel: {
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'column-reverse',
        position:'absolute',
        left:0,
        height:'100%',
        zIndex:1000
    },
    bottomPanel: {
        marginRight:5,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        flexDirection:'column',
        right:0,
        height:'100%',
        zIndex:1000
    },
    switchButton: {
        width:45,
        height:45,
        marginBottom:15
    },
    flashButton: {
        width:45,
        height:45,
        marginTop:15
    },
    locationButton: {
        alignItems:'center',
        justifyContent:'center',
        borderWidth:2,     
        borderRadius:50,
        backgroundColor:'rgba(52, 52, 52, 0.2)',
        width:45,
        height:45,
        position:'absolute',
        bottom:15
    },

});