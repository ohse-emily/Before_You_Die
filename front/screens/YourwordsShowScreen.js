import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { NavigationHelpersContext } from '@react-navigation/native';
import Text from './DefaultText';
import AsyncStorage from '@react-native-async-storage/async-storage'
import myIp from '../indivisual_ip'
import { Alert } from 'react-native';


// 너의 이야기 click -> db (lastwords)에서 랜덤 1 개 FETCH  by 세연
// axios 비동기 사용 -> return -> useEffect 
//-> isLoading  상태가 바뀌면 -> rerender return 으로 정보 가져오기
function YourwordsShowScreen({ navigation }) {
    const [yourword, setYourword] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [yourwordUndefined, setYourwordUndefined] = useState(false)
    const [likes, setLikes] = useState(false)
    const [liked, setLiked] = useState(false)
    const [reported, setReported] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            const fetchYourword = async () => {

                const userEmail = await AsyncStorage.getItem('@email_key')
                let getYourword = await axios.get(`http://${myIp}/msg/yourwords?userEmail=${userEmail}`)    //user의 email 보내서 해당 eamil 사람의 메세지만 가져오기 
                if (getYourword.data.length > 0) {
                    //좋아요가 없는 글
                    if(getYourword.data[0].lastword_likes===null || 
                        getYourword.data[0].lastword_likes==='' 
                        ){
                        setLikes(0)
                        setYourword(getYourword.data)
                        setIsLoading(true)
                    } else{
                        //data[1]은 msg controller의 yourwords에서 담았던 것
                        console.log(getYourword.data[1], '좋아요정')
                        setLiked(getYourword.data[1].likedCheck)
                        setLikes(getYourword.data[1].numLikes)
                        setYourword(getYourword.data)
                        setIsLoading(true)
                    }                    
                    setYourword(getYourword.data)
                    setIsLoading(true)
                    // console.log('case 1')
                } else {
                    setYourwordUndefined(true)
                    // console.log('case 2')
                }
            }
            fetchYourword();
        }, 2000)
    }, [])

    const handleLike = async () => {
        const userEmail = await AsyncStorage.getItem('@email_key')
        let id = yourword[0].id
        let likeTest = await axios.get(`http://${myIp}/msg/lastwordlikes?user_email=${userEmail}&id=${id}&type=0`)
        let likeIndicator = likeTest.data.msg
        if(likeIndicator === 'done'){
            setLikes(likes + 1)
            setLiked(true)
        } else if(likeIndicator === 'rejected'){
            alert('이미 좋아요를 누른 게시물입니다.')
            setLiked(true)
        }
    }

    const handleReport = async ()=>{
        Alert.alert(
        "",
        "정말로 신고하시겠습니까?",
        [
            {
            text: "Cancel",
            style: "cancel"
            },
            { text: "OK", onPress: async () => {
                const userEmail = await AsyncStorage.getItem('@email_key')
                let id = yourword[0].id
                let userEmail2 = yourword[0].user_email
                let minus_user_score = await axios.get(`http://${myIp}/msg/lastwordlikes?user_email=${userEmail}&user_email2=${userEmail2}&id=${id}&type=1`)
                setReported(true)
                Alert.alert('',minus_user_score.data.msg)
            } }
        ],
        { cancelable: false }
        );
    }

    return (
        <ScrollView>
            {isLoading ? (
                <SafeAreaView style={styles.yourwordContainer}>
                    <View style={styles.subject}>
                        <View style={[styles.subjectText,]}>
                            <Text>{yourword[0].lastword_subject}</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <ScrollView>
                            <View style={styles.yourwordRow}>
                                <Text>{yourword[0].lastword_content}</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.yourwordBottom}>
                        <Text>
                            {yourword[0].lastword_date.slice(0, 10)}
                        </Text>
                        <Text>
                            by <Text style={styles.sender}> {yourword[0].lastword_sender}</Text>
                        </Text>
                    </View>
                    {/* homebutton을 여기에 만들려고 하다가 homebutton tab이 있어서
                    다른  메세지 보기를 누르는 버튼이 더 좋을 것 같아서 버튼추가함!  by 세연 */}
                    <TouchableOpacity style={styles.anotherYourword} onPress={() => navigation.navigate('Yourwords')}>
                        <Text style={styles.anotherText}> 또 다른 이야기 들어보기 </Text>
                    </TouchableOpacity>
                    {/* 좋아요 & 신고 부분  */}
                    <View style={styles.yourwordsShowContainer}>
                        <View style={styles.yourwordsShowView}>
                            <TouchableOpacity style={styles.yourwordsShowLike} onPress = {handleLike}>
                                {liked === true 
                                    ? <AntDesign name="like2" size={20} color="blue" />
                                    : <AntDesign name="like2" size={20} color="black" />
                                }
                                { likes === 0 ? <Text>따봉</Text> : <Text> {likes}</Text> }
                            </TouchableOpacity>
                            
                        </View>
                        <View style={styles.yourwordsShowView} >
                            <TouchableOpacity style={styles.yourwordsShowLike} onPress={handleReport}>
                                <AntDesign name="exclamationcircleo" size={20} color="red" />
                            </TouchableOpacity>
                            {reported=== true
                                ?<Text>신고완료</Text>
                                :<Text>신고</Text>
                            }
                        </View>
                    </View>

                </SafeAreaView>
            ) : (
                yourwordUndefined ? (
                    <View style={styles.yourwordsShowVertical}>
                        <View style={styles.isLoading}>
                            <Text>아직 편지함에 다른 분의 편지가 없네요, {"\n"} 잠시 후에 다시 시도해 주세요 :) </Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.yourwordsShowVertical}>
                        <View style={styles.isLoading}>
                            <AntDesign style={styles.unlock} name="unlock" size={80} color="black" />
                            <Text style={styles.loadingText}>수많은 메세지 중 {"\n"}
                                인연이 닿는 분의 이야기를 {"\n"}
                                찾고 있어요 (●'◡'●)
                            </Text>
                        </View>
                    </View>
                )
            )}
        </ScrollView>
    )
}

export default YourwordsShowScreen

const styles = StyleSheet.create({
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

