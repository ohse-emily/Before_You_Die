import React from 'react';
// React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Auth from './../screens/Auth'
import Main from './../screens/Main'
import Login from './../screens/Login'
import Signup from './../screens/Signup'
import Welcome from './../screens/Welcome'
import MainApp from './MainApp'

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer independent={true} >
            <Stack.Navigator
               
                screenOptions={
                    // {headerStyle:{
                    //     backgroundColor: 'transparent'
                    // },
                    // headerTintColor: tertiary,
                    // headerTransparent: true,
                    // headerTitle: '',
                    // headerLeftContainerStyle: {
                    //     paddingLeft: 20,
                    // }}
                    {headerShown:false}
                }
                initialRouteName="Auth"
            >
                <Stack.Screen name= "Auth" component={Auth} />
                <Stack.Screen name = "Main" component={Main}/>
                <Stack.Screen name = "Login" component={Login}/>
                <Stack.Screen name = "Signup" component={Signup}/>
                <Stack.Screen 
                // options ={{headerTintColor: primary }} better not have for iOS or at least for the current pic
                name = "Welcome" 
                component={Welcome}
                />
                {/* <Stack.Screen name="MainApp" component={MainApp}/> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack;