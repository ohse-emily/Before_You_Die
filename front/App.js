import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
// import Splash from './screens/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainApp from './navigators/MainApp';
import Login from './screens/Login';
import Auth from './screens/Auth';
import Main from './screens/Main';;
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import * as Font from 'expo-font';

// 구조 변경 RootApp == App 에서 Tab의 여부로 Components 구별 by 세연  
const App = () => {
  
  const [fontLoad, setFontLoad] = useState(false)
  const AppStack = createNativeStackNavigator();

  // font 불러오기 - 다 불러와지면 fontLoad -> true -> render again  by 세연 
  useEffect(() => {
    const Load=async()=>{
      await Font.loadAsync({
          'BMHANNA_11yrs': require('./assets/fonts/BMHANNA_11yrs.ttf'),
          'BMEULJIROTTF': require('./assets/fonts/BMEULJIROTTF.ttf')
      })
      setFontLoad(true)
    }
    Load()
  }, [])

  // font Loading 여부에 따라 return 
  return (
    fontLoad ? 
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false, }}>
        {/* BottomTAB 없는 Screen   */}
        <AppStack.Screen name="Auth" component={Auth} />
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Signup" component={Signup} />
        <AppStack.Screen name="Welcome" component={Welcome} />
        {/* BottomTAB 있는 Screen  */}
        <AppStack.Screen name="MainApp" component={MainApp} />
        {/* // options ={{headerTintColor: primary }} better not have for iOS or at least for the current pic */}
      </AppStack.Navigator>
    </NavigationContainer>
    :
    <View style={styles.appLoading}>
      <Text>
        Loading...
      </Text>
    </View>
  )
}

// ' Loading...' 중앙 정렬 by세연
const styles = StyleSheet.create({
  appLoading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default App