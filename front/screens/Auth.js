import React from 'react';
import {View, Text, Image, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
            console.log('있음')
            setTimeout(()=>{
                navigation.navigate('MainApp')
            }, 3000)
        } else {
            console.log('없음')
            setTimeout(()=>{navigation.navigate('Login')}, 3000)    
        }
    })
    .catch((e)=>{
        console.log(e)
    })
    
    return(
        <View style={{margin: '20%'}}>
            <Text>
                Auth화면입니다.
                추후 SplashScreen으로 교체
            </Text>
        </View>
    )
}

export default Auth