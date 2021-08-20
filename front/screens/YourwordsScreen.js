import React, { useEffect,useState } from 'react'
import { StyleSheet, SafeAreaView, TouchableOpacity, Animated } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import Text from './DefaultText';

// header 없이 열쇠 아이콘 나오는 스크린 by 세연 
const YourwordsScreen = ({ navigation }) => {
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1))
    const [flag, setFlag] = useState(false)
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

    const handlePress = () => {
        Animated.timing(fadeAnim,
            {
                toValue:0,
                duration:2000,
            }
        ).start();
        setTimeout(()=>{
            navigation.navigate('YourwordsShow')
        },2000)
        
        // 3초 설정은 위에 navigate 한 후 바뀌도록!
        setTimeout(()=>{
            setFadeAnim(new Animated.Value(1))
        },3000)
        
    }
    
    // 한 번 더 render 해서 열쇠 아이콘이 다시 보이게 만들기 by 세연 
    useEffect(()=>{
        setFadeAnim(new Animated.Value(1))
    },[flag])

    return (
        <SafeAreaView style={styles.fadingContainer}>
            <AnimatedTouchable 
                onPress={handlePress}
                opacity={fadeAnim}
            >
                <FontAwesome name="key" size={100} color="darkcyan" />
                <Text style={styles.keyText}> Click the key !</Text>
            </AnimatedTouchable>
            
        </SafeAreaView >
    )
}

export default YourwordsScreen

const styles = StyleSheet.create({
    fadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    keyText:{
        marginTop:40,
        fontSize:15,
        
    }
})
