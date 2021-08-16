import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik'; //formik
import { RadioButton } from 'react-native-paper';
import { Octicons, Ionicons } from '@expo/vector-icons' //icons
//keyboardavoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'
// for image upload
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MainPopup from './Popup';
import Text from './DefaultText';

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    //image upload 
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    // 사진 프로필 지정 by 세연 
    const pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // user가 카메라접근을 허락하면 == granted 
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                aspect: [4, 4],
            });
            if (!pickerResult.cancelled) {
                setImage(pickerResult.uri);
            }
            setImage(pickerResult.uri)
        }
    }

    // const handleImagePicked = async (pickerResult) => {
    //     let uploadResponse, uploadResult;
    //     console.log('asdfasdfasdf',pickerResult.uri)
    //     try {
    //         setUploading(true);
    //         if(!pickerResult.cancelled){
    //             uploadResponse = await uploadImageAsync(pickerResult.uri);
    //             console.log('ddddddddddd', uploadResponse)
    //             uploadResult = await uploadResponse.json();

    //             setImage(uploadResult.location)
    //         }

    //     } catch (e) {
    //         console.log({ uploadResponse });
    //         console.log({ uploadResult });
    //         console.log({ e })
    //         alert('Upload failed for some reasons')
    //     } finally {
    //         setUploading(false)
    //     }
    // }

    // back end 

    // async function uploadImageAsync(uri){
    //     let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

    //     let uriParts = uri.split('.');
    //     let fileType = uriParts[uriParts.length-1];
    //     let formData = new FormData();
    //     formData.append('photo',{
    //         uri,
    //         name:`photo.${fileType}`,
    //         type:`image/${fileType}`,
    //     });

    //     let options = {
    //         method: 'POST',
    //         body:formData,
    //         headers:{
    //             Accept:'application/json',
    //             'Content-Type':'multipart/form-data',
    //         }
    //     }

    //     return fetch(apiUrl, options);
    // }

    // const handlePhoto = () => {
    //     ImagePicker.openPicker({
    //         width: 300,
    //         height: 400,
    //         cropping: true
    //       }).then(image => {
    //         console.log(image);
    //       });
    // }


    const [popupCheck, setPopcupCheck] = useState(true)


    const handlePopup = async (itemChecked) => {
        if (!itemChecked) {
            Alert.alert('동의항목에 동의해주세요')
            return
        }
        setPopcupCheck(!popupCheck)
    }

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.styledContainer}>
                <StatusBar style="dark" />
                <View style={styles.innerContainer}>
                    <Text style={styles.pageTitle}>BYD</Text>
                    <Text style={styles.subtitle}>회원가입</Text>
                    {popupCheck ? (<MainPopup     // 회원가입 동의서 팝업창 띄우기 by 성민
                        value={popupCheck}
                        handlePopup={handlePopup}
                        which={"handlePermission"}
                    />
                    ) : <Text />}
                    <Formik
                        initialValues={{ fullName: '', email: '', password: '', ConfirmPassword: '' }}
                        onSubmit={async (values) => {
                            values.user_image = image
                            let { ConfirmPassword, password, fullName, email, dateOfBirth } = values
                            if(email.match( /@/ )==true){
                                Alert.alert('이메일 형식에 맞춰주세요')
                                return
                            }


                            let url_email = 'http://192.168.0.32:3000/user/email_check'
                            let email_options = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email: email })
                            }
                            

                            // let response_email = await fetch(url_email, email_options)
                            // console.log(response_email)
                            if (password.length < 6){
                                Alert.alert('비밀번호는 6자리 이상으로 해주세요')
                                return
                            }

                            if (ConfirmPassword != password) {
                                Alert.alert('비밀번호가 일치하지 않습니다')
                                return
                            }
                            if (fullName == '' || email == '' || password == '') {
                                Alert.alert('필수 항목을 입력해주세요')
                                return
                            }

                            // 백앤드 가입 정보 보내기 by 성민 
                            let url = 'http://192.168.0.32:3000/user/join'
                            let options = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(values),
                            }
                            // 비동기 처리
                            let response = await fetch(url, options)
                            // let result = response.json()

                            alert('입력해주신 이메일로 인증 url을 보내드렸습니다. 인증을 진행해주세요! :)')
                            navigation.navigate('Welcome', { name: values.email })
                            //우선 이메일을 이름 대신해서 넘기도록 설정함 - 신우
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.styledFormArea}>
                                <View style={styles.avatarArea}>
                                    <TouchableOpacity
                                        style={styles.avatar}
                                        onPress={pickImage}
                                    >
                                        {/* {image ? <Image source ={{uri:image}} style={styles.profile_img}/> : <Ionicons name="person-add" size={99} color="gray" />}*/}
                                        {image ? <Image rounded source={{ uri: image }} style={styles.profile_img} /> : <Image source={require('../assets/user_.png')} style={styles.profile_img} />}
                                    </TouchableOpacity>
                                </View>
                                <MyTextInput
                                    label="" // 별명인지 이름인지
                                    icon="person"
                                    placeholder="별명을 입력해 주세요."
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                />
                                <MyTextInput
                                    label=""
                                    icon="mail"
                                    placeholder="이메일 주소를 입력해 주세요."
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label=""
                                    icon="lock"
                                    placeholder="비밀번호를 입력해 주세요."
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('ConfirmPassword')}
                                    onBlur={handleBlur('ConfirmPassword')}
                                    value={values.ConfirmPassword}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MyTextInput
                                    label=""
                                    icon="lock"
                                    placeholder="비밀번호를 다시 입력해주세요."
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                {/* <RadioButton value="first" /><Text style = {styles.radioBox}>동의합니다.</Text>
                                <RadioButton value="second"/><Text style = {styles.radioBox}>동의하지 않습니다.</Text> */}
                                <TouchableOpacity style={styles.styledButton}
                                    onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        회원가입
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.extraView}>
                                    <Text style={styles.extraText}>
                                        아이디가 존재한다면 :) ? &nbsp;
                                    </Text>
                                    <TouchableOpacity style={styles.textLink}
                                        onPress={() => navigation.navigate('Login')}>
                                        <Text style={styles.textLinkContent}>
                                            로그인
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

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <View style={styles.leftIcon}>
                <Octicons name={icon} size={30} color='mediumpurple' />
            </View>
            <Text style={styles.styledInputLabel}>{label}</Text>
            <TextInput
                style={styles.styledTextInput}
                {...props} />
            {isPassword && (
                <TouchableOpacity
                    style={styles.rightIcon}
                    onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color='#9CA3AF' />
                </TouchableOpacity>
            )}
        </View>
    )
}



export default Signup;


const styles = StyleSheet.create({
    styledContainer: {
        flex: 1,
        padding: 25,
        paddingTop: 77,// if Android`${StatusBarHeight + 40}`,
        // ${StatusBarHeight && `paddingTop:${StatusBarHeight}px`};
        backgroundColor: '#ffffff', //primary
        justifyContent: 'center'
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',

    },
    avatarArea: {
        width: '100%',
        marginTop: -15,
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        margin: 'auto',
    },
    pageTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'mediumpurple', //brand,
        padding: 10,
    },
    subtitle: {
        fontSize: 18,
        // marginBottom: 10,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#1F2937'// tertiary,
    },
    styledFormArea: {
        width: '90%',
    },
    leftIcon: {
        left: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    styledInputLabel: {
        color: '#1F2937', //tertiary
        fontSize: 13,
        textAlign: 'left',
    },
    styledTextInput: {
        backgroundColor: '#E5E7EB',//secondary;
        padding: 15,
        paddingLeft: 55,
        paddingRight: 55,
        borderRadius: 5,
        fontSize: 16,
        height: 60,
        marginTop: 0,
        marginBottom: 0,
        color: '#1F2937', //tertiary
    },
    ScrollView: {
        marginHorizontal: 20,
        height: 80,
    },
    rightIcon: {
        right: 15,
        top: 33,
        position: 'absolute',
        zIndex: 1,
    },
    styledButton: {
        padding: 15,
        backgroundColor: 'mediumpurple', //brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 25,
        height: 60,
    },
    buttonText: {
        color: '#ffffff', //primary,
        fontSize: 16,
    },
    msgBox: {
        textAlign: 'center',
        fontSize: 13,
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#9CA3AF', //darkLight,
        marginTop: 10,
    },
    extraView: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    extraText: {
        justifyContent: 'center',
        alignContent: 'center',
        color: '#1F2937', //tertiary
        fontSize: 15,
    },
    textLink: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    textLinkContent: {
        color: 'mediumpurple', //brand,
        fontSize: 15,
    },
    profile_img: {
        width: 70,
        height: 70,
    },
    radioBox: {

    }
})