import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import {PrivacyText} from './text/PrivacyText'
import Text from './DefaultText';

const PrivacyCollect = ()=>{
    
    return(
        <ScrollView>
            <Text>
                {PrivacyText}
            </Text>
        </ScrollView>
        )
}


export default PrivacyCollect