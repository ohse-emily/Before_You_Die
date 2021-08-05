import React from 'react'

//오세연 components
import HomeScreen from './screens/HomeScreen';
import MywordsScreen from './screens/MywordsScreen';
import AfterSendingScreen from './screens/AfterSendingScreen';
import VentingScreen from './screens/VentingScreen';
import YourwordsScreen from './screens/YourwordsScreen';
import ToSomeoneScreen from './screens/ToSomeoneScreen';
import MyInfoScreen from './screens/MyInfoScreen';


//엄신우 files
import Main from './screens/Main';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Welcome from './screens/Welcome';
import Popup from './screens/Popup';



const Stack=createStackNavigator()

// Home 위에 제목 styles 
const HomeScreenOptions={
  headerStyle:{backgroundColor:'lightblue'},
  headerTitleStyle:{color:'black', justifyContent:'center'},
  headerTintColor:'white',
}
