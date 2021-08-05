import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'


const HomeScreen = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: ' Main HOME',

        })
    }, [navigation])

    return (
        <View style={styles.HomeLayout}>
            <View style={styles.HomeTopLayout}>
                <TouchableOpacity activeOpacity={0.5}
                    style={styles.homeBtn1}
                    onPress={() => navigation.navigate('Mywords')}
                >
                    <Text>나의 마지막 말 </Text>
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




