import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,Image, Text, TextInput, TouchableOpacity, } from 'react-native';
import { Formik } from 'formik'; //formik
import { Octicons, Ionicons } from '@expo/vector-icons' //icons
//keyboardavoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'
// for image upload
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const Signup = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    //image upload 
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)


    

    const pickImage = async () => {
        const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // user가 카메라접근을 허락하면 == granted 
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64:true,
                aspect: [4, 4],
            });
            if(!pickerResult.cancelled){
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

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.styledContainer}>
                <StatusBar style="dark" />
                <View style={styles.innerContainer}>
                    <Text style={styles.pageTitle}>BYD</Text>
                    <Text style={styles.subtitle}>회원가입</Text>
                    <Formik
                        initialValues={{ fullName: '', email: '', dateOfBirth: '', password: '', ConfirmPassword: '' }}
                        onSubmit={async (values) => { 
                            values.user_image = image
                            let {ConfirmPassword, password, fullName,email, dateOfBirth} = values
                            
                            if(ConfirmPassword!= password){
                                Alert.alert('비밀번호가 일치하지 않습니다')
                                return
                            }
                            if(fullName=='' || email==''|| password==''){
                                Alert.alert('빈칸을 채워주세요')
                                return
                            }

                            let url = 'http://localhost:3000/user/join'

                            
                            let options = {
                                method: 'POST',
                                headers:{'Content-Type' : 'application/json'},
                                body:JSON.stringify(values),
                                }
                                // 비동기 처리

                            let response = await fetch(url,options)
                            let result = response.json()

                            navigation.navigate('Welcome')

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
                                        {image ? <Image rounded source={{uri:image}} style={styles.profile_img} /> : <Image source={require('../assets/user_.png')} style={styles.profile_img} />}
                                    </TouchableOpacity>
                                </View>
                                <MyTextInput
                                    label="이름"
                                    icon="person"
                                    placeholder="김갑생"
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                />
                                <MyTextInput
                                    label="이메일 주소"
                                    icon="mail"
                                    placeholder="이메일을 입력해 주세요."
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                <MyTextInput
                                    label="비밀번호"
                                    icon="lock"
                                    placeholder="* * * * * * * * "
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
                                    label="비밀번호 확인"
                                    icon="lock"
                                    placeholder="* * * * * * * * "
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <Text style={styles.msgBox}>...</Text>
                                <View style={styles.line} />
                                <TouchableOpacity style={styles.styledButton}
                                    onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        회원가입
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.extraView}>
                                    <Text style={styles.extraText}>
                                        아이디가 있다고요? ....
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
                <Octicons name={icon} size={30} color='#6D28D9' />
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
    },
    innerContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    avatarArea: {
        width: '100%',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        margin: 'auto',
    },
    pageTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#6D28D9', //brand,
        padding: 10,
    },
    subTitle: {
        fontSize: 18,
        marginBottom: 20,
        letterSpacing: 1,
        fontWeight: 'bold',
        color: '#1F2937'// tertiary,
    },
    styledFormArea: {
        width: '90%',
    },
    leftIcon: {
        left: 15,
        top: 38,
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
        marginTop: 3,
        marginBottom: 10,
        color: '#1F2937', //tertiary
    },
    rightIcon: {
        right: 15,
        top: 38,
        position: 'absolute',
        zIndex: 1,
    },
    styledButton: {
        padding: 15,
        backgroundColor: '#6D28D9', //brand,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 5,
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
        color: '#6D28D9', //brand,
        fontSize: 15,
    },
    profile_img:{
        width:100,
        height:100,
    }
})