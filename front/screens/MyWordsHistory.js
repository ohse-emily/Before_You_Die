import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native';
import {
    StyleSheet, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button,
} from 'react-native'
import Text from './DefaultText';

const MyWordsHistory = ({ route, navigation }) => {

    // 파라미터로 MyInfoScreen에서 리스트를 넘겨받는다. - 신우
    const { list, deleteWordHandler } = route.params
    let returnWords

    const deleteCard = (id, word_user_email) => {

        const newList = deleteWordHandler(id, word_user_email);
        newList.then(data => {
            navigation.navigate('MyWordsHistory', { list: data, deleteWordHandler })
        })
    }
    console.log(list)
    // 리스트 수에 맞게 컴포넌트 렌더링 - 신우
    // return할 내용 수정 by 세연 
    if (list.length == 0) {
        <View style={{ margin: 'auto', marginTop: '60%' }}>
            <Text>
                아직 '내 이야기 보내기'서비스를 이용한 적이 없습니다 (●'◡'●)
            </Text>
        </View>
    }
    else {
        returnWords = list.map((v, k) => {
            let { id, user_email } = v
            return (
                <View style={styles.ventingInput} key={k}>
                    <Text>
                        No. {k + 1}
                        {/* 아이디 {v.id} */}
                    </Text>
                    <Text>
                        제목 : {v.lastword_subject}
                    </Text>
                    <Text>
                        내용 : {v.lastword_content}
                    </Text>
                    {/* <Text>
                        보낸사람 {v.user_email}
                    </Text> */}
                    <Text>
                        보낸이 : {v.lastword_sender}
                    </Text>
                    <View style={styles.deleteMywords}>
                        <TouchableOpacity onPress={() => deleteCard(id, user_email)} style={styles.MyWordsHistoryBtn}>
                            <Text>삭제하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        })
    }

    return (
        <SafeAreaView style={styles.ventingContainer}>
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                    {returnWords}
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default MyWordsHistory

// css 수정 및 추가 by 세연 
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
