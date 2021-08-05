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
    MainContainer, 
    MainImage,
    Avatar
} from './../components/styles';
import Popup from './Popup';

const Main = ({navigation}) => {
    const [popupOn, setPopupOn] = useState(true)

    setModalVisible = value => {
        setPopupOn(value)
    }
    return(
        <>
            <StatusBar style="dark"/>
            <InnerContainer>
                <MainImage resizeMode = "cover" source={require('./../assets/sam.jpeg')}/>
                <MainContainer>
                {/* <Popup /> */}
                    <PageTitle welcome={true}>BYD</PageTitle>
                    <SubTitle welcome={true}>Before You Die</SubTitle>
                    <SubTitle welcome={true}></SubTitle>
                    <StyledFormArea>
                        <Line/>
                        <StyledButton onPress = {()=>{navigation.navigate('Login')}}>
                            <ButtonText>
                                로그인
                            </ButtonText>
                        </StyledButton>
                        <StyledButton onPress = {()=>{navigation.navigate('Signup')}}>
                            <ButtonText>
                                회원가입
                            </ButtonText>
                        </StyledButton>
                    </StyledFormArea>
                </MainContainer>
            </InnerContainer>
        </>
    );
}

export default Main;