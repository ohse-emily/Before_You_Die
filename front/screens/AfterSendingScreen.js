import React from 'react'
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, TextInput,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native'

const AfterSending = ( {navigation} ) => {
    return (
        <SafeAreaView style={styles.afterSendingContainer}>
                <TouchableOpacity 
                style={styles.afterSendingView}
                onPress = {()=>{navigation.navigate('Home')}}>
                <View>
                    <Text> 용기 내 줘서 고마워요 ! </Text>
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
    }
})
