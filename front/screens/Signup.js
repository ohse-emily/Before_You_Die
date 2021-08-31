import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, ScrollView, Alert, CheckBox, } from 'react-native';
import { Formik } from 'formik'; //formik
import { RadioButton, } from 'react-native-paper';
import { Octicons, Ionicons } from '@expo/vector-icons' //icons
//keyboardavoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'
// for image upload
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import MainPopup from './Popup';
import Text from './DefaultText';
import myIp from '../indivisual_ip'

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


    const [popupCheck, setPopcupCheck] = useState(false)
    const [privacyCheck, setPrivacyCheck] = useState(false)


    const handleCheck = () => {
        if (privacyCheck === true) {
            setPrivacyCheck(!privacyCheck)
            return
        }
        setPrivacyCheck(!privacyCheck)
        setPopcupCheck(!popupCheck)
    }

    const handlePopup = async (itemChecked) => {
        if (!itemChecked) {
            Alert.alert("", '동의항목에 동의해주세요')
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
                    {popupCheck ? (<MainPopup     // 회원가입 동의시 팝업창 띄우기 by 성민
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

                            // front 단에서 확인할 수 있는 부분 처리 
                            if (email.match(/@/) == true) {
                                Alert.alert('이메일 형식에 맞춰주세요')
                                return;
                            }

                            if (privacyCheck === false) {
                                Alert.alert("", '약관에 동의해주세요')
                                return
                            }

                            if (password.length < 6) {
                                Alert.alert('비밀번호는 6자리 이상으로 설정해 주세요')
                                return;
                            }

                            if (ConfirmPassword != password) {
                                Alert.alert('비밀번호가 일치하지 않습니다')
                                return;
                            }
                            if (fullName === '' || email === '' || password === '') {
                                Alert.alert('필수 항목을 입력해주세요')
                                return;
                            }

                            // 백앤드 가입 정보 보내기 by 성민 



                            let res_data;
                            try {
                                let url = `https://${myIp}/user/join`
                                let options = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(values),
                                }
                                let response = await fetch(url, options)
                                //console.log('text : ', await response.text())

                                res_data = await response.json()
                                console.log(res_data)
                                alert(res_data.msg);
                            } catch (e) {
                                alert('회원가입 중 문제가 발생하였습니다. 다시 회원가입을 진행해 주세요. ');
                                console.log('backend 에 정보 보내기 ERROR=', e)
                                return;
                            }

                            if (res_data.result) {
                                console.log(1231232)
                                if (image) {
                                    console.log(23423525)
                                    console.log('asdfsdf:', ConvertToBase64(image))

                                    let apiUrl = `https://${myIp}/user/pic_upload`
                                    let uriParts = image.split('.');
                                    let fileType = uriParts[uriParts.length - 1];
                                    let formData = new FormData();
                                    formData.append('file', {
                                        uri: image,
                                        name: `${email}photo.${fileType}`,
                                        type: `image/${fileType}`,
                                    });
                                    // 추가함 

                                    let object = {
                                        uri: image,
                                        name: `${email}photo.${fileType}`,
                                        type: `image/${fileType}`,
                                    };
                                    //formData.forEach(function(v,k){
                                    //                 object[JSON.stringify(formData._parts[0][0])]=JSON.stringify(formData._parts[0][1]);
                                    //})
                                    //let json = JSON.stringify(object)

                                    //     console.log('[0][0]',JSON.stringify(formData._parts[0][0]))
                                    //      console.log('[0][1]',JSON.stringify(formData._parts[0][1]))
                                    console.log('json(object_', JSON.stringify(object))
                                    let imgOptions = {
                                        method: 'POST',
                                        body: JSON.stringify(object),
                                        headers: {
                                            //'Accept': 'application/json',
                                            //'Content-Disposition': 'form-data',
                                            'Content-Type': 'application/json',
                                            //'Content-Type': 'multipart/form-data',
                                        }
                                    }
                                    try {
                                        let sendImage = await fetch(apiUrl, imgOptions)
                                        console.log('sendImage=', sendImage)
                                        let imgResult = await sendImage.json();
                                    } catch (e) {
                                        console.log('inserting image DB ERROR=', e)
                                        alert('이미지 업로드에 실패하였습니다.', e)
                                        return;
                                    }
                                }
                            }

                            // db로부터 받는 값 result & msg 추가 by 세연  - alert msg & result -> 성공여부 판별 
                            if (res_data.result) {
                                navigation.navigate('Welcome', { name: values.email })
                            }
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <View style={styles.styledFormArea}>
                                <View style={styles.avatarArea}>
                                    <TouchableOpacity
                                        style={styles.avatar}
                                        // multipart 오류로 일단 여기 막음 !!!! 3번째 업데이트 시 꼭 주석 풀기 ** by 세연 
                                        //onPress={pickImage}
                                    >
                                        {/* {image ? <Image source ={{uri:image}} style={styles.profile_img}/> : <Ionicons name="person-add" size={99} color="gray" />}*/}
                                        {image ? <Image rounded source={{ uri: image }} style={styles.profile_img} /> : <Image source={require('../assets/user_.png')} style={styles.profile_img} />}
                                    </TouchableOpacity>
                                </View>
                                <MyTextInput
                                    label="" // 별명인지 이름인지
                                    icon="person"
                                    placeholder="별명을 입력해 주세요"
                                    placeholderTextColor='#9CA3AF'
                                    onChangeText={handleChange('fullName')}
                                    onBlur={handleBlur('fullName')}
                                    value={values.fullName}
                                />
                                <MyTextInput
                                    label=""
                                    icon="mail"
                                    placeholder="Email을 입력해 주세요"
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
                                    placeholder="비밀번호를 재입력해주세요"
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

                                <View style={styles.privacyContainer}>
                                    <CheckBox value={privacyCheck}
                                        onChange={handleCheck}
                                    />
                                    <TouchableOpacity onPress={handleCheck}>
                                        <Text style={styles.privacyText}>
                                            개인정보 취급방침 동의(필수)
                                        </Text>
                                    </TouchableOpacity>
                                </View>



                                <TouchableOpacity style={styles.styledButton}
                                    onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>
                                        회원가입
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.extraView}>
                                    <Text style={styles.extraText}>
                                        아이디가 있으시다면 :) ? &nbsp;
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
        fontSize: 25,
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
    privacyContainer: {
        flexDirection: 'row'
    },
    privacyText: {
        marginTop: 8,
    },
    radioBox: {

    }
})