import React, { useState } from 'react'
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity,
    KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard,

} from 'react-native'
import { Button, Input } from 'react-native-elements'


const Mywords = ({ navigation }) => {

    const [mywordsSubject, setMywordsSubject] = useState('')
    const [mywordsContent, setMywordsContent] = useState('')

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
                                placeholder="제목 : 제목을 입력해주세요"
                                autoFocus
                                type="text"
                                name="mywordsSubject"
                                value={mywordsSubject}
                                onChange={text => setMywordsSubject(text)}
                            />
                            <TextInput
                                placeholder="마지막 이야기를 들려주세요"
                                type="text"
                                name="mywordsContent"
                                value={mywordsContent}
                                onChange={text => setMywordsContent(text)}
                                style={styles.mywordsInput}
                                multiline={true}
                            />
                            <View style={styles.mywordsMargin} >
                                <TouchableOpacity
                                    style={styles.mywordsButton}
                                    onPress={()=>navigation.navigate('AfterSending')}
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

export default Mywords

const styles = StyleSheet.create({
    mywordsInput: {
        width: 300,
        height: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius:8,
    },
    mywordsContainer: {
        alignItems: 'center',
    },
    mywordsButton: {
        width:160,
        height:40,
        alignItems:'center',
        padding:10,
        backgroundColor:'lightblue',
        marginTop:20,
        borderRadius:7,
    },
    ininput:{
        width:100,
        height:20,
    }
})
