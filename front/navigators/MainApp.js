import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, EvilIcons, Ionicons } from '@expo/vector-icons';

// screens by 세연
import HomeScreen from './../screens/HomeScreen';
import MywordsScreen from './../screens/MywordsScreen';
import AfterSendingScreen from './../screens/AfterSendingScreen';
import VentingScreen from './../screens/VentingScreen';
import YourwordsScreen from './../screens/YourwordsScreen';
import ToSomeoneScreen from './../screens/ToSomeoneScreen';
import YourwordsShowScreen from '../screens/YourwordsShowScreen';
// Chatting 
import ChatHomeScreen from '../screens/chat/ChatHomeScreen';
import AddChatScreen from '../screens/chat/AddChatScreen';
import ChatScreen from '../screens/chat/ChatScreen';


// screens by 신우
import MyMessages from './../screens/MyMessages'
import Login from './../screens/Login'
import Auth from './../screens/Auth'
import MyWordsHistory from './../screens/MyWordsHistory'
import SendingMSG from './../screens/SendingMSG'
import SendingEmail from './../screens/SendingEmail'
import Feed from './../screens/Feed'

// screens by 성민
import TransformPw from './../screens/TransformPw'
import MyInfoScreen from './../screens/MyInfoScreen';
import PrivacyCollect from './../screens/PrivacyCollect'

// 공동 작업 
import ServiceText from './../screens/text/ServiceText';

// Home 위에 제목 styles 
const HomeScreenOptions = {
  headerStyle: { backgroundColor: 'lavender' },
  headerTitleStyle: { color: 'black', justifyContent: 'center' },
  headerTintColor: 'white',
  headerMode: 'screen',
  cardStyle: { backgroundColor: '#ffffff' }
}
const Tabs = createBottomTabNavigator();
const YourwordsStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyInfoStack = createStackNavigator();
const ChatStack = createStackNavigator();

const YourwordsStackScreen = () => (
  <YourwordsStack.Navigator screenOptions={HomeScreenOptions}>
    <YourwordsStack.Screen name="Yourwords" component={YourwordsScreen} />
    <YourwordsStack.Screen name="YourwordsShow" component={YourwordsShowScreen} options={{ headerShown: false }} />
  </YourwordsStack.Navigator>
)

// Main Home -> 여기에 이동할 screens를 넣어야 해당 compo에서 navigate() 매서드 사용 가능  by 세연
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={HomeScreenOptions}>
    {/* <HomeStack.Screen name="LogoutAuth" component={LogoutAuth}/> */}
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="Yourwords" component={YourwordsScreen} />
    <HomeStack.Screen name="Mywords" component={MywordsScreen} />
    <HomeStack.Screen name="ToSomeone" component={ToSomeoneScreen} />
    <HomeStack.Screen name="Venting" component={VentingScreen} />
    <HomeStack.Screen name="AfterSending" component={AfterSendingScreen} />
    <HomeStack.Screen name="YourwordsShow" component={YourwordsShowScreen} options={{ headerShown: false }} />
    <HomeStack.Screen name="Login" component={Login} />
    <HomeStack.Screen name="SendingEmail" component={SendingEmail} />
    <HomeStack.Screen name="SendingMSG" component={SendingMSG} />
  </HomeStack.Navigator>
)

const MyInfoStackScreen = () => (
  <MyInfoStack.Navigator screenOptions={HomeScreenOptions}>
    <MyInfoStack.Screen name="MyInfo" component={MyInfoScreen} />
    <MyInfoStack.Screen name="MyMessages" component={MyMessages} />
    <MyInfoStack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
    <MyInfoStack.Screen name="TransformPw" component={TransformPw} />
    <MyInfoStack.Screen name="MyWordsHistory" component={MyWordsHistory} />
    <MyInfoStack.Screen name="Privacy" component={PrivacyCollect} />
    <MyInfoStack.Screen name="Service" component={ServiceText} />
    {/* 여기에 Login을 넣으면 info tab 으로 로그아웃 시 -> info tab 안에서 login compo가 나옴. -> 로그인 안됨 ! by세연  */}
  </MyInfoStack.Navigator>
)

const ChattingScreen = () => (
  <ChatStack.Navigator screenOptions={HomeScreenOptions}>
    <ChatStack.Screen name="ChatHome" component={ChatHomeScreen} />
    <ChatStack.Screen name="AddChat" component={AddChatScreen} />
    <ChatStack.Screen name="Chat" component={ChatScreen} />
  </ChatStack.Navigator>
)


export default function MainApp({ navigation }) {
  return (
    <Tabs.Navigator
      initialRouteName="메인 화면"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: 'flex',
            height: '8%',
          },
          null
        ]
      }}
    >
      <Tabs.Screen
        name="이야기 듣기"
        component={YourwordsStackScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => (
            focused
              ? <FontAwesome name="telegram" size={40} color="rgb(165, 61, 179)" />
              : <FontAwesome name="telegram" size={30} color="rgb(160, 160, 160)" />
          )
        }}
      />
      {/* <Tabs.Screen
        name="피드"
        component={Feed}
        options={{
          headerShown: true,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => (
            focused
              ? <FontAwesome name="th-list" size={35} color="rgb(165, 61, 179)" />
              : <FontAwesome name="th-list" size={30} color="rgb(160, 160, 160)" />
          )
        }}
      /> */}
      <Tabs.Screen
        name="메인 화면"
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => (
            focused
              ? <EvilIcons name="heart" size={60} color="rgb(165, 61, 179)" />
              : <EvilIcons name="heart" size={50} color="rgb(160, 160, 160)" />
          )
        }}
      />
      <Tabs.Screen
        name="채팅"
        component={ChattingScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => (
            focused
              ? <Ionicons name="chatbubbles-outline" size={35} color="rgb(165, 61, 179)" />
              : <Ionicons name="chatbubbles-outline" size={30} color="rgb(160, 160, 160)" />
          )
        }}
      />
      <Tabs.Screen
        name="나의 정보"
        component={MyInfoStackScreen}
        options={{
          headerShown: false,
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({ focused }) => (
            focused
              ? <FontAwesome name="grav" size={35} color="rgb(165, 61, 179)" />
              : <FontAwesome name="grav" size={30} color="rgb(160, 160, 160)" />
          )
        }}
      />
    </Tabs.Navigator>
  )
}


