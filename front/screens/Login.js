import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, } from 'react-native';

// save login data
import AsyncStorage from '@react-native-async-storage/async-storage';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

//statusbar
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;

//keyboardavoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'

const Login = ({navigation}) => {
    // context 저장소 로그인 시 user 정보 저장  by 세연 
    // const globalStore = useContext(Context)
    // const [state, dispatch]  = useReducer(reducer,globalStore)
    const [hidePassword, setHidePassword] = useState(true)

    const storeData = async (value, user_email) => {
        try {
          await AsyncStorage.setItem('@storage_Key', value)
          await AsyncStorage.setItem('@email_key', user_email)

        } catch (e) {
        }
    }

    return(
        <KeyboardAvoidingWrapper>
            <View style={styles.styledContainer}>
                <StatusBar style="dark"/>
                <View style={styles.innerContainer}>
                    <Image 
                        style={styles.pageLogo} 
                        resizeMode = "cover" 
                        source={require('./../assets/sam.jpeg')}
                    />
                    <Text style={styles.pageTitle}>BYD</Text>
                    <Text style={styles.subtitle}>로그인</Text>

                    <Formik
                        initialValues = {{user_email:'', user_password: ''}}
                        onSubmit = {async (values)=>{
                                
<<<<<<< HEAD
                            let url = 'http://192.168.0.26:3000/user/login/'
=======
                            let url = 'http://192.168.0.22:3000/user/login/'
>>>>>>> a7021a7f7edd81e5a2f5c8b5df31b478123f5163
                            let response = await fetch(url, {
                                method: 'POST', // or 'PUT'
                                body: JSON.stringify(values), // data can be `string` or {object}!
                                headers:{
                                  'Content-Type': 'application/json'
                                }
                            }); 
                            let getData = await response.json()
                            console.log(getData)
                            try{
                                if(getData.proceed==true){
                                    navigation.navigate("MainApp")
                                    storeData(getData.token, values.user_email)
                                }
                                else if(getData.proceed == false && getData.type == 'noverified'){
                                    alert('이메일 인증을 완료해주세요.')
                                } else if(getData.proceed == false && getData.type == 'nouser'){
                                    alert('아이디와 비밀번호를 확인해주세요')
                                }
                            } catch(e){
                                console.log(e)
                            }
                        }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values})=>(
                        <View style={styles.styledFormArea}>
                            <MyTextInput
                                label=""
                                icon="mail"
                                placeholder="이메일 주소를 입력해 주세요."
                                placeholderTextColor='#9CA3AF' //darkLight
                                onChangeText = {handleChange('user_email')}
                                onBlur={handleBlur('user_email')}
                                value={values.user_email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label=""
                                icon="lock"
                                placeholder="비밀번호를 입력해 주세요."
                                placeholderTextColor= '#9CA3AF' //darkLight
                                onChangeText = {handleChange('user_password')}
                                onBlur={handleBlur('user_password')}
                                value={values.user_password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            {/* <Text style={styles.msgBox}>...</Text>
                            <View style={styles.line}/> */}
                            <TouchableOpacity 
                                style={styles.styledButton}
                                onPress = {handleSubmit}
                            >
                                <Text style={styles.buttonText}>
                                    로그인
                                </Text>
                            </TouchableOpacity>
                            <View style={styles.extraView}>
                                <Text style={styles.extraText}>
                                    계정이 없으신가요?
                                </Text>
                                <TouchableOpacity style={styles.textLink} 
                                onPress = {()=> navigation.navigate("Signup")}
                                >
                                    <Text style={styles.textLinkContent}>
                                        회원가입
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    </Formik>
                </View>
            </View>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={30} color='mediumpurple' />
            </View>
            <Text style={styles.styledInputLabel}>{label}</Text>
            <TextInput 
            style={styles.styledTextInput}
            {...props} 
            />
            {isPassword && (
                <TouchableOpacity style={styles.rightIcon}
                onPress = {
                    ()=>setHidePassword(!hidePassword)}
                >
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={30} color='#9CA3AF'/>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    styledContainer:{
        flex:1,
        padding:25,
        paddingTop: 77,// if Android`${StatusBarHeight + 40}`,
        // ${StatusBarHeight && `paddingTop:${StatusBarHeight}px`};
        backgroundColor: '#ffffff', //primary
    },
    innerContainer:{
        flex:1,
        width:'100%',
        alignItems: 'center',
    },
    pageLogo:{
        width:250,
        height:200,
        display: 'none'
    },
    pageTitle:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'mediumpurple', //brand,
        padding:10,
    },
    subTitle:{
        fontSize: 18,
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#1F2937'// tertiary,
    },
    styledFormArea:{
        width: '90%',
    },
    leftIcon:{
        left: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    styledInputLabel:{
        color: '#1F2937', //tertiary
        fontSize: 13,
        textAlign: 'left',
    },
    styledTextInput:{
        backgroundColor: '#E5E7EB',//secondary;
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginTop: 3,
        marginBottom: 10,
        color: '#1F2937', //tertiary
    },
    rightIcon:{
        right: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    styledButton:{
        padding: 15,
        backgroundColor: 'mediumpurple', //brand,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 5,
        marginTop: 5,
        height: 60,
    },
    buttonText:{
        color: 'white', //primary,
        fontSize: 16,
    },
    msgBox:{
        textAlign: 'center',
        fontSize:13,
    },
    line:{
        height:1,
        width:'100%',
        backgroundColor: '#9CA3AF', //darkLight,
        marginTop: 10,
    },
    extraView:{
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    extraText:{
        justifyContent: 'center',
        alignContent: 'center',
        color: '#1F2937', //tertiary
        fontSize: 15,
    },
    textLink:{
        justifyContent: 'center',
        alignContent: 'center',
    },
    textLinkContent:{
        color: '#6D28D9', //brand,
        fontSize: 15,
    },
})