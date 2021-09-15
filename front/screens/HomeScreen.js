import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// popup 
import MainPopup from './Popup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from './DefaultText';
import { Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {

    const [popupCheck, setPopcupCheck] = useState(false) // 기본값 창을 띄우지 않는다
    const handlePopup = async (itemChecked) => {

        setPopcupCheck(!popupCheck) // 닫기버튼을 눌렀을때
        if (itemChecked) { // 일주일동안 보지않음이 체크되면
            let currentTime = new Date()
            // 604800000
            let week = 604800000
            let result = currentTime.getTime() + week           // 일주일동안 보지 않기 체크했을떄
            let result2 = new Date(result)                      // 현재 시간 계산해서 AsyncStorage에 넣어주는 부분 by 성민
            AsyncStorage.setItem('@time_key', String(result2))
        }
    }

    useEffect(() => {
        AsyncStorage.getItem('@time_key', (err, result) => {
            let currentTime = new Date()
            result2 = new Date(result)
            // 앱 시작할때 팝업 띄울지 말지 
            if (currentTime.getTime() >= result2.getTime()) {         // 결정하는 부분 by 성민
                setPopcupCheck(!popupCheck)
            } else {
                setPopcupCheck(popupCheck)
                // if(currentTime.getTime()<=result2.getTime()){         // 결정하는 부분 by 성민
                //     setPopcupCheck(false)
                // }else{
                //     setPopcupCheck(true)  어떤거?????
            }
        });
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Before You Die',
            headerTitleAlign: 'center',
        })
    }, [navigation])

    return (
        <View style={styles.homeScreenContainer}>
        <View style={styles.HomeLayout}>
            {/* HOME MAIN SCREEN 에 POPUP 창 띄울 때 아래 주석 해제 by 세연 */}
            {/* {popupCheck ?
                (
                    <MainPopup
                        value={popupCheck}
                        handlePopup={handlePopup}
                        which={"homescreen"}
                    />
                ) : (
                    <Text />
                )
            } */}
            <View style={styles.HomeTopLayout}>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Mywords')}
                >
                    <View style={styles.padding}>
                        <MaterialCommunityIcons name="email-send-outline" size={80} color="paleturquoise" />
                    </View>
                    <Text style={styles.mainFont}>나의 이야기 {"\n"}   보내기</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Yourwords')}
                >
                    <View style={styles.padding}>
                        <MaterialCommunityIcons name="email-receive-outline" size={80} color="skyblue" />
                    </View>
                    <Text style={styles.mainFont}>너의 이야기{"\n"}     듣기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HomePadding}></View>
            <View style={styles.HomeTopLayout}>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => { alert('서비스 준비 중 입니다 :) ') }}
                // '너에게 쓰는 편지' (특정인 문자/이메일) 서비스 준비되면 아래 주석 해제 by세연
                //onPress={() => navigation.navigate('ToSomeone')}
                >
                    <View style={styles.padding}>
                        <MaterialCommunityIcons name="message-text-lock-outline" size={80} color="lightpink" />
                    </View>
                    <Text style={styles.mainFont}>너에게 쓰는 편지</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Venting')}
                >
                    <View style={styles.padding}>
                        <MaterialCommunityIcons name="donkey" size={80} color="lightcoral" />
                    </View>
                    <Text style={styles.mainFont}>임금님귀는{"\n"}당나귀 귀</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeScreenContainer:{
        flex:1,
        justifyContent:'center',
    },
    HomeLayout: {
        paddingTop: 60,
        padding: 20,
        width: '100%',
        height: Dimensions.get('window').height*0.8,
    },
    HomeTopLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        justifyContent: 'center',
        flex: 1,
        padding: 50,
    },
    HomeBottomLayout: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    homeBtn1: {
        width: 150,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,

    },
    HomePadding: {
        // paddingBottom: 150,
    },
    homeBtn2: {
        width: 230,
        height: 90,
        backgroundColor: 'lightblue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,

    },
    padding: {
        padding: 23,
    },
    mainFont: {
        fontSize: 20,
    }
})




