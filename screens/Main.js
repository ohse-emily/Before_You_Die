import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Text, TouchableOpacity, Image,} from 'react-native';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

// import {
//     InnerContainer, // 
//     PageTitle,
//     SubTitle,
//     StyledFormArea,
//     StyledButton,
//     ButtonText,
//     Line,
//     MainContainer, 
//     MainImage,
    
// } from './../components/styles';

import Popup from './Popup';

const Main = ({navigation}) => {
    const [popupOn, setPopupOn] = useState(true)

    setModalVisible = value => {
        setPopupOn(value)
    }
    return(
        <>
            <StatusBar style="dark"/>
            <View style={styles.InnerContainer}>
                <Image style={styles.MainImage} resizeMode = "cover" source={require('./../assets/sam.jpeg')}/>
                <View style={styles.MainContainer}>
                {/* <Popup /> */}
                    <Text style={styles.PageTitle} welcome={true}>BYD</Text>
                    <Text style={styles.SubTitle}>Before You Die</Text>
                    <Text style={styles.SubTitle}></Text>
                    <View style={styles.StyledFormArea}>
                        <View style={styles.Line}/>
                        <TouchableOpacity
                        style={styles.StyledButton} 
                        onPress = {()=>{navigation.navigate('Login')}}
                        >
                            <Text style={styles.ButtonText}>
                                로그인
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.StyledButton} onPress = {()=>{navigation.navigate('Signup')}}>
                            <Text style={styles.ButtonText}>
                                회원가입
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
}

export default Main;

const styles = StyleSheet.create({
    InnerContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
    },
    PageTitle:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6D28D9', //brand,
        padding:10,
    },
    SubTitle:{
        fontSize: 18,
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#1F2937'// tertiary,
    },
    StyledFormArea:{
        width: '90%',
    },
    StyledButton:{
        padding: 15,
        backgroundColor: '#6D28D9', //brand,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        marginTop: 5,
        height: 60,
    },
    ButtonText:{
        color: '#ffffff', //primary,
        fontSize: 16,
    },
    Line:{
        height:1,
        width:'100%',
        backgroundColor: '#9CA3AF', //darkLight,
        marginTop: 10,
    },
    MainContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
        padding:25,
        paddingTop:25,
        justifyContent: 'center',
    },
    MainImage:{
        height:'50%',
        minWidth:'100%',
    }
})