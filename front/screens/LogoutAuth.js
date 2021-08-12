import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutAuth = ({navigation}) => {

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            console.log(value,'aboveIf')
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
            console.log('Home 에서  storage_Key 토큰 있음')
                navigation.navigate('MainApp')
        } else {
            console.log('Home 에서 storage_key 토큰 없음')
                navigation.navigate('Home')
        }
    })
    .catch((e)=>{
        console.log(e)
    })
    
    return(
        <View></View>
    )
}

export default LogoutAuth