import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Text, TouchableOpacity, } from 'react-native';


const Welcome = ({route, navigation}) => {
    // const {name} = route.params
    return(
        <>
            <StatusBar style="dark"/>
            <View style={styles.innerContainer}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.pageTitle}> 환영합니다!</Text>
                    <View style={styles.styledFormArea}>
                        <View style={styles.avatar}><Text>asd</Text></View>                       
                    </View>
                    <Text style={styles.subtitle}>
                        입력하신 email로 인증을 진행해 주세요 : ) 
                    </Text>

                    <TouchableOpacity style={styles.styledButton}
                            onPress = {()=>{navigation.navigate('Login')}}>
                            <Text style={styles.buttonText}>
                                로그인하러 가기
                            </Text>
                        </TouchableOpacity>
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
        marginBottom: 10
    },
    subtitle:{ //웰컴으로
        fontSize: 14,
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
        width:190,
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        marginBottom: 10,
        
    }
})