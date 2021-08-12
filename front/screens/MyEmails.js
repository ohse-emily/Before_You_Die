import React, { useState } from 'react'
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button,
} from 'react-native'

const MyEmails = ({ route, navigation, messagesList }, props ) => {

    // 파라미터로 MyInfoScreen에서 리스트를 넘겨받는다. - 신우
    const {list, deleteHandler} = route.params

    const deleteCard = (id,msg_user_email) => {

        const newList = deleteHandler(id,msg_user_email);
        // then을 써서 newList를 받아올 때까지 기다림 - 신우
        newList.then( data => {
            // 새로 받은 리스트와 딜리트핸들러 전달 - 신우
            navigation.navigate('MyEmails',{list:data,deleteHandler}) 
        })
    }

    // 리스트 수에 맞게 컴포넌트 렌더링 - 신우
    const returnMessages = list.map((v,k)=>{
        let {id, msg_user_email} = v
        return (
            <View style={styles.ventingInput} key = {k}>
                <Button title='삭제' onPress={()=>deleteCard(id, msg_user_email)}/>
                <Text> 
                    순번  {k+1}
                    아이디 {v.id}
                </Text>
                <Text> 
                    받는 사람 이메일  {v.msg_email}
                </Text>
                <Text>
                    내용 {v.msg_content}
                </Text>
                <Text>
                    기타 레이아웃 등 추가사항 생각해보기... 삭제기능 구현?
                </Text>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.ventingContainer}>
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                    {returnMessages}
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default MyMessages

const styles = StyleSheet.create({
    ventingContainer: {
        flex: 1,
    },
    ventingInput: {
        borderWidth: 1,
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

    }
})
