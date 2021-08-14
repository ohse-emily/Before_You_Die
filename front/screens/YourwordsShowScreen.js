import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { NavigationHelpersContext } from '@react-navigation/native';
import Text from './DefaultText';

// 너의 이야기 click -> db (lastwords)에서 랜덤 1 개 FETCH  by 세연
// axios 비동기 사용 -> return -> useEffect 
//-> isLoading  상태가 바뀌면 -> rerender return 으로 정보 가져오기
function YourwordsShowScreen({ navigation }) {
    const [yourword, setYourword] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            const fetchYourword = async () => {
                let getYourword = await axios.get('http://192.168.0.22:3000/msg/yourwords')    //user의 email 보내서 해당 eamil 사람의 메세지만 가져오기 
                setYourword(getYourword.data)
                setIsLoading(true)
            }
            fetchYourword();
        }, 3000)
    }, [])

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

                </SafeAreaView>
            ) : (
                <View style={styles.isLoading}>
                    <AntDesign style={styles.unlock} name="unlock" size={80} color="black" />
                    <Text style={styles.loadingText}>수많은 메세지 중 {"\n"}
                        인연이 닿는 분의 이야기를 {"\n"}
                        찾고 있어요 (●'◡'●)
                    </Text>
                </View>
            )}
        </ScrollView>
    )
}

export default YourwordsShowScreen

const styles = StyleSheet.create({
    yourwordContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    content: {
        backgroundColor: 'lavender',
        width: '83%',
        height: 310,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        padding: 10,
    },
    subjectText: {

    },
    isLoading: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "40%",
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
    }

})


