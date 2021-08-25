import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Input, Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import myIp from '../../indivisual_ip';

// 채팅방 추가 screen by 세연 
const ChatScreen = ({ navigation, route }) => {

    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "채팅방 개설하기 ",
            headerStyle: { backgroundColor: 'lightblue' },
            headerTintColor: 'black',
        })
    }, [navigation])

    // 채팅방 개설하면 DB에 추가하기 by 세연 
    const createChat = async () => {
        try {
            let url = `http://${myIp}/chat/addchat/`
            let user_email = await AsyncStorage.getItem('@email_key')
            let data = {user_email, chat_name:input}
            let response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let addChat_result = await response.json()
            console.log('getData=', addChat_result)
            // route.chatAdded(addChat_result.gotchats)
            // navigation.goBack();
            let gotchats = addChat_result.gotchats;
            navigation.navigate('ChatHome',{
                gotchats,
            })
            // navigation.navigate('Chat', {
            //     id, chatName,
            // })
        } catch (e) {
            console.log('createChat Fetch ERROR =', e)
        }
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="채팅방 이름을 입력해주세요"
                value={input}
                onChangeText={(text) => setInput(text)}
                leftIcon={
                    <MaterialIcons name="chat" size={24} color="darkblue" />
                }
            />
            <Button
                onPress={createChat} title='Create new Chat'
            />
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        padding:30,
        height:'100%',
    }
})
