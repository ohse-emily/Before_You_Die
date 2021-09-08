import React, { useLayoutEffect} from 'react'
import {
    StyleSheet,  View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, TextInput,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native'
import Text from './DefaultText';

const AfterSending = ( {navigation} ) => {

//      console.log(navigation.getState())
useLayoutEffect(() => {
    navigation.setOptions({
        title: '보내기 완료',
        headerTitleAlign: 'center',
    })
}, [navigation])


    return (
        <SafeAreaView style={styles.afterSendingContainer}>
                <TouchableOpacity 
                style={styles.afterSendingView}
                // onPress = {()=>{navigation.popToTop()}}>
                onPress = {()=>{navigation.navigate('Home')}}>
                
                <View>
                    <Text style={styles.afterSendingText}> 용기 내줘서 고마워요 ! </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AfterSending

const styles = StyleSheet.create({
    afterSendingContainer:{
        justifyContent:'center',
        flex:1,
        alignItems:'center'
    },
    afterSendingView: {
        backgroundColor: 'lightpink',
        width:'80%',
        height:'80%',
        justifyContent:'center',
        alignItems:'center'
    },
    afterSendingText:{
        fontSize:20,
    }
})
