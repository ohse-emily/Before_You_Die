import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import myIp from '../../indivisual_ip'
import CustomListItem from './CustomListItem';


// 채팅기능 구현 by 세연 
const ChatScreen = ({ navigation, route }) => {

    const [chats, setChats] = useState([])
    const [chatsLoad, setChatsLoad] = useState(false)

    useEffect(() => {
        const fetchchats = async () => {
            let getchat = await axios.get(`http://${myIp}/chat/getchat`)    //user의 email 보내서 해당 eamil 사람의 메세지만 가져오기 
            console.log('asdf', getchat.data.gotchats)
            console.log('chats=', chats)
            if (getchat.data.result) {
                console.log('axios getchat result = true')
                setChats(getchat.data.gotchats)
                setChatsLoad(true)
            } else {
                console.log('axios getchat result = false')
            }
        }
        fetchchats();
    }, [])


    // header 수정 
    useLayoutEffect(() => {
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

    const enterChat = (id, chatName) =>{
        navigation.navigate('Chat',{
            id, chatName,
        })
    }
    
    return (
        !chatsLoad ?
            <>
                <Text> Loading...</Text>
            </>
            :
            <>
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
            </>
        // <SafeAreaView>
        //     <ScrollView>
        //         {chats.map((chat) => (
        //             <View key={chat.id}>
        //                 <TouchableOpacity style={styles.chatHomeList}>
        //                     <Text style={styles.chatHomeEle}>{chat.id}</Text>
        //                     <Text style={styles.chatHomeEle}>{chat.chat_name}</Text>
        //                     <View style={styles.chatHomeEle3}>
        //                         <Text style={[styles.chatHomeEle]}>{chat.chat_date.slice(0, 10)}</Text>
        //                         <Text style={styles.chatHomeEle}> {chat.chat_date.slice(11, 16)}</Text>
        //                     </View>
        //                 </TouchableOpacity>
        //             </View>
        //         ))}
        //     </ScrollView>
        // </SafeAreaView>
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
    chatHomeContainer:{
        height:'100%',
    }
})
