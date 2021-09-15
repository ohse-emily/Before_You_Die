import React, { useLayoutEffect, useState, useEffect, useRef } from 'react'
import {
    StyleSheet, Text, View, Platform, KeyboardAvoidingView,
    TouchableOpacity, StatusBar, SafeAreaView, ScrollView, TextInput,
    Keyboard, TouchableWithoutFeedback,
} from 'react-native'
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios';
import myIp from '../../indivisual_ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
// import Text from '../DefaultText';
import { Dimensions } from 'react-native';

// 채팅을 주고 받는 Chat screen 전체 by 세연 
const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [user_email, setUser_email] = useState('')

    useEffect(() => {
        const sendmsg = async () => {
            let uEmail = await AsyncStorage.getItem('@email_key')
            setUser_email(uEmail)
        }
        sendmsg();
    }, [])

    useLayoutEffect(() => {

        // 채팅방 위에 가장 마지막으로 채팅보낸 사람의 프로필 사진 띄우기 by세연 
        let chatProfile;
        if (messages[0]) {
            chatProfile = messages[0].user_profile ?
                { uri: `${myIp}/${messages[messages.length - 1].user_profile}` }
                : require('../../assets/user_.png')
        }

        // const windowWidth = Dimensions.get('window').width;
        const screen = Dimensions.get('screen');
        const windowHeight = Dimensions.get('window').height;
        console.log('aaaaaaa', screen.height, windowHeight)

        const settings = async () => {
            navigation.setOptions({
                title: "채팅",
                headerBackTitleVisible: false,
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: 'white' },
                headerTintColor: 'black',
                headerTitle: () => (
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            rounded
                            source={chatProfile}
                        // style={{marginRight:10}}
                        />
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
                        <TouchableOpacity style={{ width: 30 }} onPress={() => alert('서비스 준비 중입니다 :) ')}>
                            <FontAwesome name="video-camera" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 22 }} onPress={() => alert('서비스 준비 중입니다 :) ')}>
                            <Ionicons name="call" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: 20 }} >
                            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                )
            })
        }
        settings();
    }, [navigation, messages])


    // 메세지 보내면 keyboard dismiss & 보낸 사람의 정보, msg DB 입력 by 세연   
    const sendMessage = async () => {
        Keyboard.dismiss();

        let options = {
            method: 'POST',
            url: `${myIp}/chat/sendmsg`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                user_email: await AsyncStorage.getItem('@email_key'),
                chat_name: route.params.chatName,
                chatting_msg: input,
            }
        }
        let sendingResult = await axios(options)
        // 메세지가 local back db에 잘 입력되면 
        // console.log('sendingResult', sendingResult)

        if (sendingResult && sendingResult.status === 200) {
            setMessages(sendingResult.data.data)
        }
        setInput('')
    }


    // db에서 지금까지의 채팅들 가져오기 by 세연 
    useLayoutEffect(() => {
        const getChattingHistory = async () => {

            let options = {
                method: 'POST',
                url: `${myIp}/chat/chat_history`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                data: {
                    chat_name: route.params.chatName
                }
            }
            let sendingResult = await axios(options)
            let gotresult = sendingResult.data;
            setMessages(gotresult.data)
        }
        getChattingHistory();
    }, [route])

    const scrollViewRef = useRef();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.chatContainer}
                keyboardVerticalOffset={useHeaderHeight() + 20}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <>
                        <ScrollView
                            contentContainerStyle={{ paddingTop: 15, paddingBottom: 10, }}
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>

                            {/* 채팅들이 기록되는 곳 by 세연 */}
                            {messages.map((data, i) =>
                                data.user_email === user_email ?
                                    (
                                        <View key={i} >
                                            <View style={styles.reciever}>
                                                <Avatar
                                                    position="absolute"
                                                    rounded
                                                    bottom={-15}
                                                    right={-13}
                                                    size={30}
                                                    source={data.user_profile ?
                                                        { uri: `${myIp}/${data.user_profile}` }
                                                        : require('../../assets/user_.png')}
                                                />
                                                <Text style={styles.recieverText}>{data.chatting_msg}</Text>
                                            </View>
                                            <Text style={styles.recieverTime}>{data.chatting_time.slice(11, 16)}</Text>
                                        </View>
                                    ) : (
                                        <View key={i}>

                                            <View style={styles.sender}>
                                                <Avatar
                                                    position="absolute"
                                                    bottom={-19}
                                                    left={-13}
                                                    // top={}
                                                    rounded
                                                    size={30}
                                                    source={data.user_profile ?
                                                        { uri: `${myIp}/${data.user_profile}` }
                                                        : require('../../assets/user_.png')}
                                                />
                                                <Text style={styles.senderText}>{data.chatting_msg}</Text>
                                            </View>
                                            <View style={styles.senderNameAndTime}>
                                                <Text style={styles.senderName}>{data.user_nickname}</Text>
                                                <Text style={styles.senderTime}>{data.chatting_time.slice(11, 16)}</Text>
                                            </View>
                                        </View>
                                    )
                            )}
                        </ScrollView>
                        <View style={styles.chatFooter}>
                            <TextInput
                                placeholder="메세지를 입력해 주세요"
                                value={input}
                                onChangeText={(text) => setInput(text)}
                                style={styles.chatTextInput}
                                onSubmitEditing={sendMessage}  // enter로 입력해도 submit 되도록
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
        width: 80,
        marginRight: 10,
    },
    chatHeader: {
        width: '80%',
        height: 20,

    },
    chatContainer: {
        flex: 1,
    },
    reciever: {
        padding: 10,
        backgroundColor: "#fdd835",
        alignSelf: 'flex-end',   // 받는 메세지는 오른쪽 위치
        borderRadius: 17,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",

    },
    recieverText: {
        color: 'black',
        fontWeight: '500',
        marginLeft: 3,
    },
    sender: {
        padding: 10,
        backgroundColor: 'lightgrey',
        alignSelf: 'flex-start',   // 보내는 메세지는 왼쪽 위치
        borderRadius: 17,
        margin: 15,
        maxWidth: '80%',
        position: 'relative',
    },
    senderName: {
        left: 66,
        paddingRight: 10,
        bottom: 14,
        fontSize: 13,
        color: 'black',
        position: 'absolute'
    },
    senderText: {
        color: 'black',
        fontWeight: "500",
        marginLeft: 3,
    },
    chatFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 5,
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
    senderTime: {
        color: "grey",
        fontSize: 12,
        left: 33,
        bottom: 15,
    },
    recieverTime: {
        color: "grey",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 7,
        right: 33,
    },
    senderNameAndTime: {
        // flexDirection:'row',
        // flexWrap:'wrap'
        // position:"absolute",
    }
})
