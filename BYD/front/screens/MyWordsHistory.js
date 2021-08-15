import React, { useState } from 'react'
import {
    StyleSheet, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button,
} from 'react-native'
import Text from './DefaultText';

const MyWordsHistory = ({ route, navigation } ) => {

    // 파라미터로 MyInfoScreen에서 리스트를 넘겨받는다. - 신우
    const {list, deleteWordHandler } = route.params
    let returnWords

    const deleteCard = (id,word_user_email) => {

        const newList = deleteWordHandler(id,word_user_email);
        newList.then( data => {
            navigation.navigate('MyWordsHistory',{list:data,deleteWordHandler}) 
        })
    }
    console.log(list)
    // 리스트 수에 맞게 컴포넌트 렌더링 - 신우
    if(list.length==0){ // 나중에 내용 바꾸기
        <View style={{margin: 'auto', marginTop: '60%'}}>
        <Text> 
            음슴
        </Text>
    </View>
    }
    else{
        returnWords = list.map((v,k)=>{
            let {id, user_email} = v
            return (
                <View style={styles.ventingInput} key = {k}>
                    <Button title='삭제' onPress={()=>deleteCard(id, user_email)}/>
                    <Text> 
                        순번  {k+1}
                        아이디 {v.id}
                    </Text>
                    <Text> 
                        제목  {v.lastword_subject}
                    </Text>
                    <Text>
                        내용 {v.msg_content}
                    </Text>
                    <Text>
                        보낸사람 {v.user_email}
                    </Text>
                    <Text>
                        가명 {v.lastword_sender}
                    </Text>
                    <Text>
                        기타 레이아웃 등 추가사항 생각해보기... 수정기능 구현?
                    </Text>
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
