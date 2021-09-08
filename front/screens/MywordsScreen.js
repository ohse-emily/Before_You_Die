import React, { useState,useLayoutEffect } from 'react'
import {
    StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity,
    KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard, Dimensions
} from 'react-native'
import { Button, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './DefaultText';
import myIp from '../indivisual_ip'

const Mywords = ({ navigation }) => {
    const [mywordsSubject, setMywordsSubject] = useState('')
    const [mywordsContent, setMywordsContent] = useState('')
    const [mywordsSender, setMywordsSender] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            title: '나의 이야기 전하기',
            headerTitleAlign: 'center',
        })
    }, [navigation])


    // mywords 를 백앤드로 보내기 -> db 추가! by 세연 
    // AsyncStorage에서 user_email 가져오기 
    const mywordsSubmit = async (sub, con, sen) => {
        if (mywordsSubject == '') {
            alert('제목을 작성해 주세요.')
        } else if (mywordsContent == '') {
            alert('내용을 작성해 주세요.')
        } else if (mywordsSender == '') {
            alert('보내는 사람 이름을 작성해 주세요.')
        } else {
            try {
                let user_email = await AsyncStorage.getItem('@email_key')
                let mywordsData = { lastword_subject: sub, lastword_content: con, lastword_sender: sen, user_email }
                let url = `${myIp}/msg/mywords/`

                try {
                    await fetch(url, {
                        method: 'POST',
                        body: JSON.stringify(mywordsData),
                        headers: { 'Content-Type': 'application/json' }
                    })
                } catch (e) { console.log(e, 'mywordsSubmit Fetch Post ERROR=', e) }
                navigation.navigate('AfterSending')
            } catch (e) {
                console.log('mywordsSubmit Function ERROR =', e)
            }
        }
    }



    // const sendMywords = () => {
    //     Keyboard.dismiss()
    // }

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
                                placeholder=" 제목을 입력해주세요"
                                autoFocus
                                type="text"
                                name="mywordsSubject"
                                value={mywordsSubject}
                                onChangeText={text => setMywordsSubject(text)}
                            />
                            <TextInput
                                placeholder="누군가가 들어 주었으면 하는, 세상에 하고 싶은 말! 어떤 이야기도 좋아요! "
                                type="text"
                                name="mywordsContent"
                                value={mywordsContent}
                                onChangeText={text => setMywordsContent(text)}
                                style={styles.mywordsInput}
                                multiline={true}
                            />
                            <View style={styles.mysowrdsSenderView}>
                                <Text>
                                    보내는 사람 :
                                </Text>
                                <TextInput
                                    placeholder=" 보내는 사람"
                                    value={mywordsSender}
                                    onChangeText={(text) => setMywordsSender(text)}
                                    style={styles.mywordsSender}
                                />
                            </View>
                            <View style={styles.mywordsMargin} >
                                <TouchableOpacity
                                    style={styles.mywordsButton}
                                    onPress={
                                        () => mywordsSubmit(mywordsSubject, mywordsContent, mywordsSender)
                                        // ()=>navigation.navigate('AfterSending')
                                    }
                                // onPress={() => navigation.navigate('AfterSending')}
                                >
                                    <Text style={styles.mywordsSending}>누군가에게 전하기</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Mywords

const styles = StyleSheet.create({
    mywordsInput: {
        width: 300,
        height: Dimensions.get('window').height * 0.5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        textAlignVertical: 'top',
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
    },
    mysowrdsSenderView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    mywordsSending: {
        fontSize: 17,
    }
})
