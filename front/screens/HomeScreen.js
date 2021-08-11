import React, { useState, useLayoutEffect, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
// popup 
import MainPopup from './Popup';




const HomeScreen = ({ navigation }, props) => {


    const [popupCheck, setPopcupCheck] = useState(false)

    const handlePopup = async (itemChecked) => {

        setPopcupCheck(!popupCheck)
        if(itemChecked){
            let currentTime = new Date()
            let week = 604800000
            let result = currentTime.getTime() + week           // 일주일동안 보지 않기 체크했을떄
            let result2 = new Date(result)                      // 현재 시간 계산해주는 부분 by 성민
            AsyncStorage.setItem('@time_key', String(result2))
        }
    }
    useEffect(()=>{
        AsyncStorage.getItem('@time_key',(err,result)=>{
            let currentTime = new Date()
            result2 = new Date(result)
                                                                  // 앱 시작할때 팝업 띄울지 말지 
            if(currentTime.getTime()>=result2.getTime()){         // 결정하는 부분 by 성민
                setPopcupCheck(!popupCheck)
            }else{
                setPopcupCheck(popupCheck)
            }
        })
    },[])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: ' Main HOME',
        })
    }, [navigation])

    return (
        <View style={styles.HomeLayout}>
            {popupCheck ? 
            (<MainPopup
                value={popupCheck}
                handlePopup={handlePopup}
                which={"homescreen"}
            />
            ):(
            <Text/>
            )}
            <View style={styles.HomeTopLayout}>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Mywords')}
                >
                    <Text >나의 마지막 말 </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Yourwords')}
                >
                    <Text>너의 마지막 말</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.HomePadding}></View>
            <View style={styles.HomeBottomLayout}>
                <TouchableOpacity  activeOpacity={0.5}
                    style={styles.homeBtn2}
                    onPress={() => navigation.navigate('ToSomeone')}
                >
                    <Text>누군가에게 나의 말 전하기</Text>
                </TouchableOpacity>
                <View style={styles.HomePadding}></View>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn2}
                    onPress={() => navigation.navigate('Venting')}
                >
                    <Text>고해성사</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    HomeLayout: {
        paddingTop:40,
        padding: 20,
    },
    HomeTopLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    HomeBottomLayout: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    homeBtn1: {
        width: 150,
        height: 90,
        backgroundColor:'lightpink',
        alignItems:'center',
        justifyContent:'center', 
        borderRadius:7,
    },
    HomePadding: {
        paddingBottom: 20,
    },
    homeBtn2: {
        width:230,
        height:90,
        backgroundColor: 'lightblue',        
        alignItems:'center',
        justifyContent:'center',
        borderRadius:7,

    }
})




