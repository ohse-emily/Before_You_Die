import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';

//formik
import {Formik} from 'formik';

//icons
import {Octicons, Ionicons, Fontisto} from '@expo/vector-icons'

import {
    InnerContainer,
    PageTitle,
    SubTitle,
    StyledFormArea,
    StyledButton,
    ButtonText,
    Line,
    WelcomeContainer, 
    WelcomeImage,
    Avatar
} from './../components/styles'

const Welcome = ({navigation}) => {
    return(
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <WelcomeImage resizeMode = "cover" source={require('./../assets/sam.jpeg')}/>
                <WelcomeContainer>
                    <PageTitle welcome={true}>이랏샤이마세</PageTitle>
                    <SubTitle welcome={true}>엄신우님, 회원가입을 축하합니다.</SubTitle>
                    <StyledFormArea>
                    <Avatar resizeMode = "cover" source={require('./../assets/sam.jpeg')}/>
                        <Line/>
                        <StyledButton onPress = {()=>{navigation.navigate('Login')}}>
                            <ButtonText>
                                로그인하러 가기
                            </ButtonText>
                        </StyledButton>
                       
                    </StyledFormArea>
                </WelcomeContainer>
            </InnerContainer>
        </>
    );
}

export default Welcome;