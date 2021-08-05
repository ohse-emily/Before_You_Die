import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
//formik
import {Formik} from 'formik';
//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

import {
    StyledContainer, InnerContainer, PageLogo, PageTitle,
    SubTitle, StyledFormArea,LeftIcon, StyledInputLabel,
    StyledTextInput, RightIcon, StyledButton, ButtonText, MsgBox, 
    Line, Colors, ExtraView, ExtraText,TextLink, TextLinkContent,
} from './../components/styles'

import {View, TouchableOpacity} from 'react-native'

//colors
const {brand, darkLight, primary} = Colors;

//keyboardavoiding view
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper'

const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true)

    return(
        <KeyboardAvoidingWrapper>
            <StyledContainer>
                <StatusBar style="dark"/>
                <InnerContainer>
                    <PageLogo resizeMode = "cover" source={require('./../assets/sam.jpeg')}/>
                    <PageTitle>BYD</PageTitle>
                    <SubTitle>회원가입</SubTitle>
                    <Formik
                        initialValues = {{fullName: '', email:'', dateOfBirth: '', password: '', confirmPassword: ''}}
                        onSubmit = {(values)=>{
                            console.log(values);
                            navigation.navigate('Welcome')
                        }}
                        
                    >
                    {({handleChange, handleBlur, handleSubmit, values})=>(
                        <StyledFormArea>
                            <MyTextInput
                                label="이름"
                                icon="person"
                                placeholder="김갑생"
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('fullName')}
                                onBlur={handleBlur('fullName')}
                                value={values.fullName}
                            />
                            <MyTextInput
                                label="이메일 주소"
                                icon="mail"
                                placeholder="이메일을 입력해 주세요."
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                            />
                            <MyTextInput
                                label="비밀번호"
                                icon="lock"
                                placeholder="* * * * * * * * "
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('ConfirmPassword')}
                                onBlur={handleBlur('ConfirmPassword')}
                                value={values.ConfirmPassword}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <MyTextInput
                                label="비밀번호 확인"
                                icon="lock"
                                placeholder="* * * * * * * * "
                                placeholderTextColor={darkLight}
                                onChangeText = {handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={hidePassword}
                                isPassword={true}
                                hidePassword={hidePassword}
                                setHidePassword = {setHidePassword}
                            />
                            <MsgBox>...</MsgBox>
                            <Line/>
                            <StyledButton onPress = {handleSubmit}>
                                <ButtonText>
                                    회원가입
                                </ButtonText>
                            </StyledButton>
                            
                            <ExtraView>
                                <ExtraText>
                                    아이디가 있다고요? .... 
                                </ExtraText>
                                <TextLink onPress = {()=> navigation.navigate('Login')}>
                                    <TextLinkContent>로그인</TextLinkContent>
                                </TextLink>
                            </ExtraView>
                        </StyledFormArea>
                    )}
                    </Formik>
                </InnerContainer>
            </StyledContainer>
        </KeyboardAvoidingWrapper>
    );
}

const MyTextInput = ({label, icon, isPassword, hidePassword, setHidePassword, ...props}) => {
    return(
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress = {()=>setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye' } size={30} color={darkLight}/>
                </RightIcon>
            )}
        </View>

    )
}

export default Signup;