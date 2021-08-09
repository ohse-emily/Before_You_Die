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

const getData = async () => {
    try {
        console.log('getdata entrance')
      const value = await AsyncStorage.getItem('@storage_Key')
      if(value !== null) {
        // value previously stored
        return value
      }
    } catch(e) {
      // error reading value
    }
  }

const Auth = ({navigation}) => {
    let returnToken = getData()
    if (returnToken !== null){
        navigation.navigate('MainApp')
    } else{
        navigation.navigate('Login')
    }
    return(
        <View style={{margin: '20%'}}>
            <Text>
                asdasd
                adasdasdas
                da
                sd
                asd
                asdasdsd
                as
            </Text>
            <Button
                title="SaveData"
                onPress={()=>{storeData('asaaad'); console.log('세이브')}}
            />
            <Button
                title="LoadData"
                onPress={()=>{getData(); console.log('로드')}}
            />
        </View>
    )
}

export default Auth