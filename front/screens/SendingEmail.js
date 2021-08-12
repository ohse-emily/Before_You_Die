import React, { useState } from 'react'
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity,
    KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard,

} from 'react-native'
import { Button, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SendingEmail = ({ navigation }) => {

    const [mywordsReceiver, setMywordsReceiver] = useState('')
    const [mywordsContent, setMywordsContent] = useState('')

    const mywordsSubmit = async (rec, con) => {
        if(mywordsReceiver == ''){
            alert('받는 사람을 기재해 주세요.')
        } else if(mywordsContent == ''){
            alert('내용을 작성해 주세요.')
        } else{
            try {
                let user_email = await AsyncStorage.getItem('@email_key')
                let mywordsData = { msg_email: rec, msg_content: con, msg_user_email: user_email,  msg_method: 0}
                let url = `http://192.168.0.26
                :3000/msg/mymessages`
                try {
                    await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(mywordsData),
                        headers: {'Content-Type': 'application/json'}
                    })
                } catch (e) { console.log(e, 'mywordsSubmit Fetch Post ERROR=', e)}            
                navigation.navigate('AfterSending')
                console.log(mywordsReceiver, mywordsContent)
            } catch (e) {console.log('mywordsSubmit Function ERROR =', e)}
        }


    }

    const sendMywords = () => {
        Keyboard.dismiss()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <KeyboardAvoidingView
                    style={styles.mywordsContainer}
                    KeyboardVerticalOffset={90}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <Input
                                placeholder="받는 분의 email 주소를 적어주세요"
                                autoFocus
                                type="text"
                                name="mywordsReceiver"
                                value={mywordsReceiver}
                                onChangeText={text => setMywordsReceiver(text)}
                            />
                            <TextInput
                                placeholder="하고 싶은 말을 전해주세요"
                                type="text"
                                name="mywordsContent"
                                value={mywordsContent}
                                onChangeText={text => setMywordsContent(text)}
                                style={styles.mywordsInput}
                                multiline={true}
                            />
                            <View style={styles.mywordsMargin} >
                                <TouchableOpacity
                                    style={styles.mywordsButton}
                                    onPress = {() => {mywordsSubmit(mywordsReceiver, mywordsContent); }}
                                    // onPress={() => navigation.navigate('AfterSending')}
                                >
                                    <Text>누군가에게 전하기</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SendingEmail

const styles = StyleSheet.create({
    mywordsInput: {
        width: 300,
        height: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        textAlignVertical: 'top'
    },
    mywordsContainer: {
        alignItems: 'center',
    },
    mywordsButton: {
        width: 160,
        height: 40,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightblue',
        marginTop: 20,
        borderRadius: 7,
    },
    ininput: {
        width: 100,
        height: 20,
    }
})
