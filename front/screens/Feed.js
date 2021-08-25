import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button, TouchableOpacity, Dimensions,
} from 'react-native'
import axios from 'axios';
import Text from './DefaultText';
import myIp from '../indivisual_ip'
import { AntDesign } from '@expo/vector-icons';

const Feed =  ({ navigation }) => {
    const [list, setList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const loadFeed = async() => {
        // setLoaded(false)
        let feedList =  await axios.get(`http://${myIp}/msg/loadfeed`) 
        let result = feedList.data
        console.log(result)
        setList(result)
        setLoaded(true)
    }
    //1안
    // let renderList = list.map((v,k)=>{
    //     let newDate = v.lastword_date.substr(0,10)
    //     return(
    //         <View style={styles.ventingInput} key={k}>
    //         <Text>
    //             No. {k + 1}
    //         </Text>
    //         <Text>
    //             제목 : {v.lastword_subject}
    //         </Text>
    //         <Text>
    //             내용 : {v.lastword_content}
    //         </Text>
    //         <Text>
    //             전송일 {newDate}
    //         </Text>
    //         <Text>
    //             보낸이 : {v.lastword_sender}
    //         </Text>
    //         <Text>
    //             좋아요 : {v.howMany}
    //         </Text>
    //     </View>
    //     )
    // })

    //2안
    let renderList = list.map((v,k)=>{
        return(
            <SafeAreaView style={styles.yourwordContainer}>
                <View style={styles.subject}>
                    <View style={[styles.subjectText,]}>
                        <Text>{v.lastword_subject}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <View style={styles.yourwordRow}>
                            <Text>{v.lastword_content}</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.yourwordBottom}>
                    <Text>
                        {v.lastword_date.slice(0, 10)}
                    </Text>
                    <Text>
                        by <Text style={styles.sender}> {v.lastword_sender}</Text>
                    </Text>
                </View>
                {/* 좋아요 & 신고 부분  */}
                <View style={styles.yourwordsShowContainer}>
                    <View style={styles.yourwordsShowView}>
                        <TouchableOpacity style={styles.yourwordsShowLike} 
                        // onPress = {handleLike}
                        >
                                <AntDesign name="like2" size={20} color="black" />
                                <Text> {v.howMany} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.yourwordsShowView} >
                        <TouchableOpacity style={styles.yourwordsShowLike} 
                        // onPress={handleReport}
                        >
                            <AntDesign name="exclamationcircleo" size={20} color="red" />
                        </TouchableOpacity>
                        <Text>신고</Text>
                    </View>
                </View>
            </SafeAreaView>
        )
    })


    useEffect(()=>{
        loadFeed()

    },[loaded])

    return (
        <SafeAreaView style={styles.ventingContainer}>
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                    {renderList}
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Feed


const styles = StyleSheet.create({
    ventingContainer: {
        flex: 1,
    },
    ventingInput: {
        borderWidth: 2,
        borderColor:'mediumpurple',
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
    },

    ////

    yourwordsShowVertical: {
        flex: 1,
        width: '100%',
        height: Dimensions.get('window').height*0.9,
        justifyContent: 'center',
    },
    yourwordContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop:30,
    },
    content: {
        backgroundColor: 'lavender',
        width: '83%',
        height: Dimensions.get('window').height * 0.5,  // 요게 다른 디바이스에서 똑같은지 확인 
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 10,
        paddingBottom: '15%',
        position: 'relative',
        borderColor:'mediumpurple',
        borderWidth:1,
    },
    subjectText: {

    },
    isLoading: {
        flexDirection: "column",
        alignItems: "center",
    },
    unlock: {
        color: 'pink',
        padding: 30
    },
    loadingText: {
        fontSize: 15,
    },
    yourwordRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    sender: {
        fontWeight: 'bold',
        color: 'purple'
    },
    subject: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lavender',
        width: '83%',
        height: 30,
        marginTop: '13%',
        marginBottom: 20,
        borderRadius: 7,
        borderWidth:1,
        borderColor:'mediumpurple',
    },
    yourwordBottom: {
        width: '83%',
        height: '80%',
        padding: 7,
        flex: 1,
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    anotherYourword: {
        borderWidth: 2,
        borderColor: 'pink',
        backgroundColor: 'lavenderblush',
        padding: 9,
        borderRadius: 7,
    },
    anotherText: {
        color: 'black',
    },
    yourwordNothing: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    yourwordsShowContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 110,
        right: 35,

    },
    yourwordsShowView: {
        width: 35,
    }

})
