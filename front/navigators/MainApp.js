import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, EvilIcons } from '@expo/vector-icons';

// screens by 세연
import HomeScreen from './../screens/HomeScreen';
import MywordsScreen from './../screens/MywordsScreen';
import AfterSendingScreen from './../screens/AfterSendingScreen';
import VentingScreen from './../screens/VentingScreen';
import YourwordsScreen from './../screens/YourwordsScreen';
import ToSomeoneScreen from './../screens/ToSomeoneScreen';
import MyInfoScreen from './../screens/MyInfoScreen';
import YourwordsShowScreen from '../screens/YourwordsShowScreen';

// screens by 신우
import MyMessages from './../screens/MyMessages'
import RootStack from './RootStack'

// ? 
import MyWordsHistory from './../screens/MyWordsHistory'
const Stack=createStackNavigator()

// Home 위에 제목 styles 
const HomeScreenOptions = {
  headerStyle: { backgroundColor: 'lavender' },
  headerTitleStyle: { color: 'black', justifyContent: 'center' },
  headerTintColor: 'white',
  headerMode:'screen',
  cardStyle:{backgroundColor:'#ffffff'}
}
const Tabs = createBottomTabNavigator();
const YourwordsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyInfoStack = createStackNavigator();

const YourwordsStackScreen = () => (
  <YourwordsStack.Navigator screenOptions={HomeScreenOptions}>
    <YourwordsStack.Screen name="Yourwords" component={YourwordsScreen} />
    <YourwordsStack.Screen name="YourwordsShow" component={YourwordsShowScreen} options={{ headerShown: false }} />
  </YourwordsStack.Navigator>
)


// Main Home -> 여기에 이동할 screens를 넣어야 해당 compo에서 navigate() 매서드 사용 가능  by 세연
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={HomeScreenOptions}
  >
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Yourwords" component={YourwordsScreen} />
    <HomeStack.Screen name="Mywords" component={MywordsScreen} />
    <HomeStack.Screen name="ToSomeone" component={ToSomeoneScreen} />
    <HomeStack.Screen name="Venting" component={VentingScreen} />
    <HomeStack.Screen name="AfterSending" component={AfterSendingScreen} />
    <HomeStack.Screen name="YourwordsShow" component={YourwordsShowScreen} options={{ headerShown: false }} />
  </HomeStack.Navigator>
)

const MyInfoStackScreen = () => (
  <MyInfoStack.Navigator screenOptions={HomeScreenOptions}>
    <MyInfoStack.Screen name="MyInfo" component={MyInfoScreen} />
    <MyInfoStack.Screen name="MyMessages" component={MyMessages} />
    <MyInfoStack.Screen name="RootStack" component={RootStack} options={{ headerShown: false }}/>
    {/* <MyInfoStack.Screen name="MyInfo" component={MyInfoScreen}/>
    <HomeStack.Screen name="MyWordsHistory" component={MyWordsHistory}/>
    <MyInfoStack.Screen name="MyMessages" component={MyMessages}/> */}
  </MyInfoStack.Navigator>
)

//MainApp로 이름 변경
export default function MainApp({ navigation }) {
  return (
      <NavigationContainer independent={true}>
        <Tabs.Navigator
          initialRouteName="HomeTab"
          screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarStyle: [
              {
                display: 'flex'
              },
              null
            ]
          }}
        >
          <Tabs.Screen
            name="YourwordsTab"
            component={YourwordsStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (<FontAwesome name="telegram" size={30} />)
            }}
          />
          <Tabs.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (<EvilIcons name="heart" size={40} color="black" />)
            }}
          />
          <Tabs.Screen
            name="MyInfoTab"
            component={MyInfoStackScreen}
            options={{
              headerShown: false,
              tabBarIcon: () => (<FontAwesome name="grav" size={30} />)
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
  )
}


