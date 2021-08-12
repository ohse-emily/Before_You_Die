import 'react-native-gesture-handler';
import React from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainApp from './navigators/MainApp'
import Login from './screens/Login'
import Auth from './screens/Auth'
import Main from './screens/Main'
import Signup from './screens/Signup'
import Welcome from './screens/Welcome'
import MyWordsHistory from './screens/MyWordsHistory'
// import Splash from './screens/Splash'

const AppStack = createNativeStackNavigator();
// 구조 변경 RootApp == App 에서 Tab의 여부로 Components 구별 by 세연  

class App extends React.Component {
  // state={
  //   isLoading:true,
  // }
  // componentDidMount=async()=>{
  //   setTimeout(()=>{this.setState({isLoading:false,})},3000)
  // }
  render() {
    // if(this.state.isLoading){
    //   return <Splash/>
    // }else{
    //return Components 
    // }
    return (
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false, }}>
          {/* Tab이 없는 Login 등의 Screen */}
          <AppStack.Screen name="Auth" component={Auth} />
          <AppStack.Screen name="Main" component={Main} />
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="Signup" component={Signup} />
          <AppStack.Screen name="Welcome" component={Welcome} />
          {/* Tab 이 있는 Main menu Screen  */}
          <AppStack.Screen name="MainApp" component={MainApp} />
          {/* // options ={{headerTintColor: primary }} better not have for iOS or at least for the current pic */}
        </AppStack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App