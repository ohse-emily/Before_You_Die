import React, { useState } from 'react'
import {
    StyleSheet, ScrollView, SafeAreaView,
    KeyboardAvoidingView, TextInput,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native'
import MainPopup from './Popup'
import Text from './DefaultText';

const Venting = ({ navigation }) => {
    console.log(navigation.getState())
    const [ventingContent, setVentingContent] = useState('')

    const [popupVenting, setPopupVenting] = useState(true)
    const popupVent = () => {
        console.log('asdf')
        setPopupVenting(!popupVenting)
    }
    console.log(popupVenting)
    return (
        <SafeAreaView style={styles.ventingContainer}>
            {popupVenting ?
                (<MainPopup
                    value={popupVenting}
                    handlePopup={popupVent}
                    which={"ventingScreen"}
                    style={styles.ventingPopup}
                />
                ) : (
                    <Text />
            )}
            <ScrollView >
                <KeyboardAvoidingView style={styles.ventingAvoidingView}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <TextInput
                                placeholder="나의 고해성사를 시작해 보세요"
                                type="text"
                                name="ventingContent"
                                value={ventingContent}
                                onChange={text => setVentingContent(text)}
                                style={styles.ventingInput}
                                multiline={true}
                            />
                        </>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity
                        style={styles.ventingSending}
                        onPress={() => navigation.navigate('AfterSending')}
                    >
                        <Text style={styles.ventingBtnText}> 저 멀리 날려 보내기</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}


export default Venting

const styles = StyleSheet.create({
    ventingContainer: {
        flex: 1,
    },
    ventingInput: {
        borderWidth: 1,
        width: 300,
        height: 300,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    ventingAvoidingView: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    ventingSending: {
        width: 200,
        height: 40,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightblue',
        marginTop: 20,
        borderRadius: 7,

    },
    ventingPopup:{
        fontSize:15,
    },
    ventingBtnText:{
        fontSize:19,
    }
})
