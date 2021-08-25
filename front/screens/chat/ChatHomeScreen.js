import React, { useEffect, useLayoutEffect, useState,  } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import myIp from '../../indivisual_ip';
import CustomListItem from './CustomListItem';
import { useIsFocused } from '@react-navigation/native';

// 채팅기능 구현 전체 by 세연 
const ChatScreen = ({ navigation, route }) => {

    const [chats, setChats] = useState([])
    const isFocused = useIsFocused();

    useEffect(() => {
        console.log('나야나')
        const fetchchats = async () => {
            let getchat = await axios.get(`http://${myIp}/chat/getchat`)
            if (getchat.data.result) {
                console.log('axios getchat result = true')
                setChats(getchat.data.gotchats)
            } else {
                console.log('axios getchat result = false')
            }
        }
        fetchchats();
    }, [isFocused])

    // 채팅방 이름이 바로 뜨기 위해 시도   -> isFocused (goBack()과 쓰일 때) 가 답이었다!! by 세연 
    // useEffect(() => {
    //     if (route.params) {
    //         setChats(route.params.gotchats)
    //     }
    // }, [isFocused]);


    // Header 설정 by 세연 
    useLayoutEffect(() => {
        console.log('리랜더 되나요???????????')
        navigation.setOptions({
            title: "Let's have a talk!",
            headerStyle: { backgroundColor: 'lightblue' },
            headerTintColor: 'black',
            headerRight: () => (
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    width: 30,
                    marginRight: 10,
                }}>
                    {/* 나중에 아이콘 추가 시 사용하기 by 세연  */}
                    {/* <TouchableOpacity activeOpacity={0.5}>
                    </TouchableOpacity> */}
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('AddChat')}>
                        <FontAwesome name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id, chatName,
        })
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.chatHomeContainer}>
                {chats.map((chat) => (
                    <CustomListItem
                        key={chat.id}
                        id={chat.id}
                        chatName={chat.chat_name}
                        enterChat={enterChat}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    chatHomeList: {
        flex: 1,
        padding: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: 'lightgrey',
    },
    chatHomeEle: {
        padding: 5,
        // flex:1,
        // alignContent:'space-between'
    },
    chatHomeEle3: {
        flex: 1,
        flexDirection: 'row-reverse',
    },
    chatHomeContainer: {
        height: '100%',
    }
})
