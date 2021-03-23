import React from 'react';
import { WebView } from 'react-native-webview';
import {
  View,
} from 'react-native';

function Form (){
    const styles = require('../styles/style');

    return(
        <View style={{flex: 1, flexDirection:'column'}}>
            <WebView
                source={{ uri: 'https://docs.google.com/forms/d/e/1FAIpQLScVVwK7GSxmMepoSXtn5krYMRkapqwEqpXaAQtmUycgOnOSFg/viewform?usp=sf_link' }}
            />
        </View>
        
    );
};

export default Form;