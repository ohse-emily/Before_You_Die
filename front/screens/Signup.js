import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ScrollView, } from 'react-native';
import { Formik } from 'formik'; //formik
import { RadioButton } from 'react-native-paper';
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

    return (
        <KeyboardAvoidingWrapper>
            <View style={styles.styledContainer}>
                <StatusBar style="dark" />
                <View style={styles.innerContainer}>
                    <Text style={styles.pageTitle}>BYD</Text>
                    <Text style={styles.subtitle}>회원가입</Text>
                    <Formik
                        initialValues={{ fullName: '', email: '', password: '', ConfirmPassword: '' }}
                        onSubmit={async (values) => {
                            values.user_image = image
                            let { ConfirmPassword, password, fullName, email, dateOfBirth } = values

                            if (ConfirmPassword != password) {
                                Alert.alert('비밀번호가 일치하지 않습니다')
                                return
                            }
                            if (fullName == '' || email == '' || password == '') {
                                Alert.alert('필수 항목을 입력해주세요')
                                return
                            }

                            // 백앤드 가입 정보 보내기 by 성민 
                            let url = 'http://localhost:3000/user/join'
                            let options = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(values),
                            }
                            // 비동기 처리
                            let response = await fetch(url, options)
                            let result = response.json()



                            alert('입력해주신 이메일로 인증 url을 보내드렸습니다. 인증을 진행해주세요! :)')
                            navigation.navigate('Welcome',{name: values.email})
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
                                    label="별명" // 별명인지 이름인지
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
                                <ScrollView style = {styles.ScrollView}>
                                    <Text>
                                            개인정보보호법에 따라 BYD 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, {"\n"}
                                            개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.{"\n"}
                                            1. 수집하는 개인정보{"\n"}
                                            저희 어플리케이션은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.{"\n"}
                                            {"\n"}
                                            회원가입 시점에 BYD가 이용자로부터 수집하는 개인정보는 아래와 같습니다.{"\n"}
                                            - 회원 가입 시에 ‘아이디, 비밀번호, 이메일’ 을 필수항목으로 수집합니다.{"\n"}
                                            서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.{"\n"}
                                            BYD 내의 개별 서비스 이용, 결제 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 {"\n"}
                                            해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.{"\n"}
                                            {"\n"}
                                            {"\n"}
                                            2. 수집한 개인정보의 이용{"\n"}
                                            BYD 및 BYD 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.{"\n"}
                                            {"\n"}
                                            - 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.{"\n"}
                                            - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, {"\n"}
                                            지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.{"\n"}
                                            - 법령 및 BYD 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재,{"\n"}
                                            - 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.{"\n"}
                                            - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.{"\n"}
                                            - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.{"\n"}
                                            - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.{"\n"}
                                            - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.{"\n"}
                                            {"\n"}
                                            3. 개인정보의 보관기간{"\n"}
                                            회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.{"\n"}
                                            참고로 BYD는 ‘개인정보 유효기간제’에 따라 2년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관하여 관리하고 있습니다.{"\n"}
                                            {"\n"}
                                            4. 개인정보 수집 및 이용 동의를 거부할 권리{"\n"}
                                            이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, {"\n"}
                                            필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.'{"\n"}
                                    </Text>
                                </ScrollView>
                                
                                <Text style={styles.msgBox}>...</Text>
                                <View style={styles.line} />
                                <RadioButton value="first" /><Text style = {styles.radioBox}>동의합니다.</Text>
                                <RadioButton value="second"/><Text style = {styles.radioBox}>동의하지 않습니다.</Text>
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
    ScrollView: {
        marginHorizontal: 20,
        height: 80,
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
    profile_img: {
        width: 100,
        height: 100,
    },
    radioBox: {

    }
})