import React, { useLayoutEffect, useState, useEffect } from 'react'
import {StyleSheet, Text, View, Platform, KeyboardAvoidingView,
    TouchableOpacity, StatusBar, SafeAreaView, ScrollView, TextInput,
    Keyboard, TouchableWithoutFeedback
} from 'react-native'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import myIp from '../../indivisual_ip';
import AsyncStorage from '@react-native-async-storage/async-storage';

// chat 채팅창 screen by 세연 
const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('')

    // useEffect(() => {
    //     const sendmsg = async () => {
    //         // let user_email = await AsyncStorage.getItem('@email_key')

    //     }
    //     sendmsg();
    // }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "채팅",
            headerBackTitleVisible: false,
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: 'lightblue' },
            headerTintColor: 'black',
            headerTitle: () => (
                <View>
                    <Text style={styles.chatHeader} >{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }}
                    onPress={navigation.goBack}
                >
                    <AntDesign style={{ width: 26 }} name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={styles.chatHeaderRight}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })

    }, [navigation])

    // 메세지 보내면 keyboard dismiss & 보낸 사람의 정보, msg DB 입력 by 세연   
    const sendMessage = async() => {
        Keyboard.dismiss();
             
        let options = {
            method:'POST',
            url:`http://${myIp}/chat/sendmsg`,
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            data:{
                user_email: await AsyncStorage.getItem('@email_key'),
                chat_name:route.params.chatName,
                chatting_msg:input,
            }
        }
        let sendingResult = await axios(options)    //user의 email 보내서 해당 eamil 사람의 메세지만 가져오기 
        console.log('asdf',sendingResult)

        if(sendingResult && sendingResult.status===200){

        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatContainer}
                keyboardVerticalOffset={useHeaderHeight() + 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>
                            {/* Chat goes here */}
                        </ScrollView>
                        <View style={styles.chatFooter}>
                            <TextInput
                                placeholder="Singmal Message"
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                style={styles.chatTextInput}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    chatHeaderRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 65,
        marginRight: 10,
    },
    chatHeader: {
        width: '80%',
        height: 20,

    },
    chatContainer: {
        flex: 1,
    },
    chatFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    chatTextInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        color: 'grey',
        borderRadius: 30,
    },
})
