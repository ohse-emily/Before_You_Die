import React from 'react'
import {StyleSheet, Text, View, ImageBackground} from 'react-native'

function Splash() {
    return (
        <ImageBackground
            source = {require('../assets/byd_logo.jpg')}
            style={{width:"100%", height:"100%"}}
        ></ImageBackground>
    )
}

export default Splash
