import React, { useRef,useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';


const YourwordsScreen = ({ navigation }) => {
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1))

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

    const handlePress = () => {
        Animated.timing(fadeAnim,
            {
                toValue:0,
                duration:3000,
            }
        ).start();
        setTimeout(()=>{
            navigation.navigate('YourwordsShow')
        },3000)
        
    }


    return (
        <SafeAreaView style={styles.fadingContainer}>
            <AnimatedTouchable 
                onPress={handlePress}
                opacity={fadeAnim}
            >
                <FontAwesome name="key" size={100} color="darkcyan" />
            </AnimatedTouchable>
        </SafeAreaView >
    )
}

export default YourwordsScreen

const styles = StyleSheet.create({
    fadingContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: '40%',
    }
})
