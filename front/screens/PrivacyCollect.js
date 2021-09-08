import React, { useState,useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView } from 'react-native';
import { PrivacyText } from './text/PrivacyText'
import Text from './DefaultText';

const PrivacyCollect = ({navigation}) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'BYD 개인정보 취급 방침',
            headerTitleAlign: 'center',
        })
    }, [navigation])
    return (
        <ScrollView>
            <View style={styles.privacyContainer}>
                <Text style={styles.privacySub}>BYD 개인정보 취급 방침</Text>
                <Text style={styles.privacyTextCSS}>
                    {PrivacyText}
                </Text>
            </View>
        </ScrollView>
    )
}


export default PrivacyCollect

const styles = StyleSheet.create({
    privacyContainer:{
        padding:10,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 1,
        alignItems: 'center',
    }, 
    privacySub: {
        padding:10,
    },
    PrivacyTextCSS: {
        padding: 20,
    }

})