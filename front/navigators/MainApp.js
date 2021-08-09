import 'react-native-gesture-handler';
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesome,EvilIcons } from '@expo/vector-icons';

import RootStack from './RootStack'

// screens by Seyeon
import HomeScreen from './../screens/HomeScreen';
import MywordsScreen from './../screens/MywordsScreen';
import AfterSendingScreen from './../screens/AfterSendingScreen';
import VentingScreen from './../screens/VentingScreen';
import YourwordsScreen from './../screens/YourwordsScreen';
import ToSomeoneScreen from './../screens/ToSomeoneScreen';
import MyInfoScreen from './../screens/MyInfoScreen';

const Stack=createStackNavigator()

// Home 위에 제목 styles 
const HomeScreenOptions={
  headerStyle:{backgroundColor:'lightblue'},
  headerTitleStyle:{color:'black', justifyContent:'center'},
  headerTintColor:'white',
}
const Tabs = createBottomTabNavigator();

const YourwordsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyInfoStack = createStackNavigator();

const YourwordsStackScreen =()=>(
  <YourwordsStack.Navigator screenOptions={HomeScreenOptions}>
    <YourwordsStack.Screen name="Yourwords" component={YourwordsScreen}/>
  </YourwordsStack.Navigator>
)

// Main Home -> 여기에 이동할 screens를 넣어야 해당 compo에서 navigate() 매서드 사용 가능  by 세연
const HomeStackScreen =()=>(
  <HomeStack.Navigator 
    screenOptions={HomeScreenOptions}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Yourwords" component={YourwordsScreen} />
    <HomeStack.Screen name="Mywords" component={MywordsScreen}/>
    <HomeStack.Screen name="ToSomeone" component={ToSomeoneScreen}/>
    <HomeStack.Screen name="Venting" component={VentingScreen}/>
    <HomeStack.Screen name="AfterSending" component={AfterSendingScreen}/>
  </HomeStack.Navigator>
)

const MyInfoStackScreen =()=>(
  <MyInfoStack.Navigator screenOptions={HomeScreenOptions}>
    <MyInfoStack.Screen name="MyInfo" component={MyInfoScreen}/>
  </MyInfoStack.Navigator>
)

//MainApp로 이름 변경
export default function MainApp({navigation}) {
  return (
    <NavigationContainer independent={true}>
      <Tabs.Navigator 
        initialRouteName="HomeTab"
        screenOptions={{
        tabBarHideOnKeyboard:true,
        tabBarStyle:[
          {
            display:'flex'
          },
          null
        ]
        }}
      >
        <Tabs.Screen 
          name="YourwordsTab" 
          component={YourwordsStackScreen}  
          options={{
            headerShown:false,
            tabBarIcon:()=>(<FontAwesome name="telegram" size={30}/>)
          }}
        />
        <Tabs.Screen 
          name="HomeTab" 
          component={HomeStackScreen} 
          options={{
            headerShown:false,
            tabBarIcon:()=>(<EvilIcons name="heart" size={40} color="black" />)
          }}
        />
        <Tabs.Screen 
          name="MyInfoTab" 
          component={MyInfoStackScreen}  
          options={{
            headerShown:false,
            tabBarIcon:()=>(<FontAwesome name="grav" size={30}/>)
          }}
        />
      </Tabs.Navigator>
      
      {/* <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Mywords" component={MywordsScreen}/>
        <Stack.Screen name="AfterSending" component={AfterSendingScreen}/>
        <Stack.Screen name="Venting" component={VentingScreen}/>
        <Stack.Screen name="Yourwords" component={YourwordsScreen}/>
        <Stack.Screen name="ToSomeone" component={ToSomeoneScreen}/>
      </Stack.Navigator> */}
    </NavigationContainer>
  )
}


