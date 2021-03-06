import React from 'react';
import {View,  Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './DefaultText';

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@storage_Key', value)
      console.log(value, 'storeData')
    } catch (e) {
      // saving error
    }
}

const Auth = ({navigation}) => {
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            console.log(value,'AsyncStorage에 storage_key가 있는 경우 ')
            // value previously stored
            return value;

        } catch(e) {
            console.log(value,'inCatch')
          // error reading value
        }
    }
    getData()
    .then(data=>{
        if( data !== null){
            console.log('login 위한  storage_Key 토큰 있음')
                navigation.navigate('MainApp')
        } else {
            console.log('login 위한 storage_key 토큰 없음')
                navigation.navigate('Login')
        }
    })
    .catch((e)=>{
        console.log(e)
    })
    
    return(
        <View></View>
    )
}


export default Auth