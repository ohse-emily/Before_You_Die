import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, } from 'react-native';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

const Welcome = ({route, navigation}) => {
    // const {name} = route.params
    return(
        <>
            <StatusBar style="dark"/>
            <View style={styles.innerContainer}>
                {/* <Image style={styles.welcomeImage} 
                resizeMode = "cover" 
                source={require('./../assets/sam.jpeg')}/> */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.pageTitle}>어서오세요!</Text>
                    <Text style={styles.subtitle}>
                        {/* {name} */} 
                        님, 회원가입을 축하합니다.
                    </Text>
                    <View style={styles.styledFormArea}>
                    {/* <Image style={styles.avatar} 
                    resizeMode = "cover" 
                    source={require('./../assets/sam.jpeg')}
                    /> */}
                        <View style={styles.avatar}><Text>asd</Text></View>
                        {/* <View style={styles.line}/> */}
                        <TouchableOpacity style={styles.styledButton}
                            onPress = {()=>{navigation.navigate('Login')}}>
                            <Text style={styles.buttonText}>
                                로그인하러 가기
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </View>
        </>
    );
}

export default Welcome;

const styles = StyleSheet.create({
    innerContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
    },
    pageTitle:{
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'mediumpurple', //brand,
        padding:10,
        marginBottom: 100
    },
    subtitle:{ //웰컴으로
        fontSize: 18,
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: 'normal',
        color: '#1F2937'// tertiary,
    },
    styledFormArea:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    styledButton:{
        width: '100%',
        padding: 15,
        backgroundColor: 'mediumpurple', //brand,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        marginTop: 5,
        height: 60,
    },
    buttonText:{
        color: '#ffffff', //primary,
        fontSize: 16,
    },
    line:{
        height:1,
        width:'100%',
        backgroundColor: '#9CA3AF', //darkLight,
        marginTop: 10,
    },
    welcomeContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        padding:25,
        paddingTop:10,
        justifyContent: 'center',
    },
    welcomeImage:{
        height:'50%',
        minWidth:'100%',
    },
    //아바타 위치 수정 필요
    avatar:{
        width:100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        marginBottom: 10,
        marginTop: 10,
    }
})