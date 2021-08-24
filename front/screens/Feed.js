import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import {
    StyleSheet, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button,
} from 'react-native'
import axios from 'axios';
import Text from './DefaultText';
import myIp from '../indivisual_ip'

const Feed = ({ navigation }) => {

    const getList = async () => {
        let result = await axios.get(`http://${myIp}/msg/loadfeed`) 
        console.log(result.data)
    }


    return (
        <SafeAreaView style={styles.ventingContainer}>
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                <View style={styles.ventingInput} >
                    <Text>
                        No. 
                        {/* 아이디 {v.id} */}
                    </Text>
                    <Text>
                        제목 :
                    </Text>
                    <Text>
                        내용 : 
                    </Text>
                    {/* <Text>
                        보낸사람 {v.user_email}
                    </Text> */}
                    <Text>
                        보낸이 :
                    </Text>
                    <Button onPress = {getList} title="asd"/>
                    {/* <View style={styles.deleteMywords}>
                        <TouchableOpacity onPress={() => deleteCard(id, user_email)} style={styles.MyWordsHistoryBtn}>
                            <Text>삭제하기</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Feed


const styles = StyleSheet.create({
    ventingContainer: {
        flex: 1,
    },
    ventingInput: {
        borderWidth: 2,
        borderColor:'mediumpurple',
        width: 300,
        height: 'auto',
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
        marginTop: 20,
        marginBottom: 20,
    },
    ventingAvoidingView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    ventingSending: {
        width: 120,
        height: 40,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightblue',
        marginTop: 20,
        borderRadius: 7,
    },
    MyWordsHistoryBtn: {
        borderColor: 'mediumpurple',
        borderWidth: 2,
        width: '24%',
        height: 30,
        marginTop: 5,
        backgroundColor: 'palevioletred',
        justifyContent: 'center',
        borderRadius: 8,
        alignContent:'center',
        justifyContent:'center',
        flex:1,
        alignItems:'center',
    },
    deleteMywords:{
        alignContent:'center',
        justifyContent:'center',
        flex:1,
        alignItems:'center',

    }
})
