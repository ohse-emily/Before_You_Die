import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View, Image, Text, TextInput, TouchableOpacity, } from 'react-native';

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
    const [hidePassword, setHidePassword] = useState(true)

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
                        initialValues = {{email:'', password: ''}}
                        onSubmit = {(values)=>{
                            console.log(values);
                            navigation.navigate("Welcome")
                        }}
                    >
                    {({handleChange, handleBlur, handleSubmit, values})=>(
                        <View style={styles.styledFormArea}>
                            <MyTextInput
                                label="이메일 주소"
                                icon="mail"
                                placeholder="이메일을 입력해 주세요."
                                placeholderTextColor='#9CA3AF' //darkLight
                                onChangeText = {handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="비밀번호"
                                icon="lock"
                                placeholder="* * * * * * * * "
                                placeholderTextColor= '#9CA3AF' //darkLight
                                onChangeText = {handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <Text style={styles.msgBox}>...</Text>
                            <View style={styles.line}/>
                            <TouchableOpacity style={styles.styledButton}
                            // onPress = {handleSubmit}
                            onPress = {()=> navigation.navigate('MainApp')}
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
                <Octicons name={icon} size={30} color='#6D28D9' />
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
    },
    pageTitle:{
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6D28D9', //brand,
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
        top: 38,
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
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },
    styledButton:{
        padding: 15,
        backgroundColor: '#6D28D9', //brand,
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