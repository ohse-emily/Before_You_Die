import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View, ScrollView, SafeAreaView,
    KeyboardAvoidingView, Button, TouchableOpacity,
    Dimensions, Alert
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Text from './DefaultText';
import myIp from '../indivisual_ip'
import { AntDesign } from '@expo/vector-icons';

const Feed = ({ navigation }) => {
    const [list, setList] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [likes, setLikes] = useState(false)
    const [liked, setLiked] = useState(false)
    const [reported, setReported] = useState(false)

    const loadFeed = async () => {
        // setLoaded(false)
        const userEmail = await AsyncStorage.getItem('@email_key')
        let feedList = await axios.get(`http://${myIp}/msg/loadfeed?user_email=${userEmail}`)
        let result = feedList.data
        console.log(result)
        setList(result)
        setLoaded(true)
    }

    let renderList = list.map((v, k) => {


        const handleLike = async () => {
            const userEmail = await AsyncStorage.getItem('@email_key')
            let id = v.id
            let likeTest = await axios.get(`http://${myIp}/msg/lastwordlikes?user_email=${userEmail}&id=${id}&type=0`)
            // let likeIndicator = likeTest.data.msg
            // if(likeIndicator === 'done'){
            //     setLikes(likes + 1)
            //     setLiked(true)
            // } else if(likeIndicator === 'rejected'){
            //     alert('이미 좋아요를 누른 게시물입니다.')
            //     setLiked(true)
            // }
            console.log(likeTest.data)
        }

        const handleReport = async () => {
            Alert.alert(
                "",
                "정말로 신고하시겠습니까?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            const userEmail = await AsyncStorage.getItem('@email_key')
                            let id = v.id
                            let userEmail2 = v.user_email
                            let minus_user_score = await axios.get(`http://${myIp}/msg/lastwordlikes?user_email=${userEmail}&user_email2=${userEmail2}&id=${id}&type=1`)
                            setReported(true)
                            Alert.alert('', minus_user_score.data.msg)
                        }
                    }
                ],
                { cancelable: false }
            );
        }

        return (
            <View style={styles.itemFrame}>
                <View style={styles.subject}>
                    <View>
                        <Text>{v.lastword_subject}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <ScrollView style={styles.contentScroll}
                        nestedScrollEnabled={true}>
                        <View style={styles.yourwordRow}>
                            <Text>{v.lastword_content}</Text>
                        </View>
                    </ScrollView>
                    <View style={{ position: 'relative', }}>
                        <View style={styles.yourwordBottom}>
                            <Text>
                                {v.lastword_date.slice(0, 10)}
                            </Text>
                            <Text>
                                by <Text style={styles.sender}> {v.lastword_sender}</Text>
                            </Text>
                        </View>
                        {/* 좋아요 & 신고 부분  */}
                        {/* <View style={styles.yourwordsShowContainer}>
                                <View style={styles.yourwordsShowView}>
                                    <TouchableOpacity style={styles.yourwordsShowLike} 
                                    onPress = {handleLike}
                                    >
                                            <AntDesign name="like2" size={20} color="black" />
                                            <Text> {v.howMany} </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.yourwordsShowView} >
                                    <TouchableOpacity style={styles.yourwordsShowLike} 
                                    onPress={handleReport}
                                    >
                                        <AntDesign name="exclamationcircleo" size={20} color="red" />
                                    </TouchableOpacity>
                                    <Text>신고</Text>
                                </View>
                            </View> */}
                    </View>
                </View>

            </View>

        )
    })


    useEffect(() => {
        loadFeed()

    }, [loaded])

    return (
        <SafeAreaView style={styles.ventingContainer}>
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                    <SafeAreaView style={styles.yourwordContainer}>
                        {renderList}
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Feed


const styles = StyleSheet.create({
    ventingContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    ventingAvoidingView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    yourwordContainer: { //
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
        paddingTop: 30,
    },
    content: { //
        backgroundColor: 'lightcyan',
        width: '83%',
        // height: '100%',
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderRadius: 7,
        padding: 10,
        paddingBottom: '15%',
        borderColor: 'turquoise',
        borderWidth: 1,
    },
    contentScroll: {
        maxHeight: 200,
        marginBottom: 40,
    },
    yourwordRow: { //
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    sender: { //
        fontWeight: 'bold',
        color: 'darkcyan'
    },
    subject: { //
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: 20,
        // padding: 10,
        backgroundColor: 'lightcyan',
        width: '83%',
        // height: 30,
        marginBottom: 20,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'turquoise',
    },
    yourwordBottom: { //
        position: 'absolute',
        alignItems: 'flex-end',
        right: 15,
    },
    yourwordsShowContainer: { //
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        left: 15,

    },
    yourwordsShowView: { //
        // width: 35,
        alignItems: 'flex-end',
    },
    itemFrame: {
        // height:'100%',
        width: Dimensions.get('window').width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'darkcyan',
        borderWidth: 1,
        paddingTop: 20,
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    }

})
