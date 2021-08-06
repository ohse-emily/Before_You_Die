import * as React from 'react';
import { Button, View, Separator, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StyleSheet} from "react-native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{margin: 10}, {width:'50%'}}>
        <Button
          title="이메일 보내기"
          onPress={() => navigation.navigate('Profile')}
        />
      </View>
      <View style={{height:30}}>

      </View>
      <View style={{margin:10}, {width:'50%'}}>
        <Button
          title="문자 보내기"
          color="#f194ff"
          onPress={() => navigation.navigate('Notifications')}
        />
      </View>
    </View>
  );
}

function ProfileScreen({ navigation }) {
  const [text1, onChangeText1] = React.useState("email");
  const [text2, onChangeText2] = React.useState("contents");
  const [number, onChangeNumber] = React.useState('name');

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
          <TextInput
            style={StyleSheet.title}
            onChangeText={onChangeText1}
            value={text1}
          />
          <TextInput
            style={StyleSheet.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <TextInput
            style={StyleSheet.bottom}
            onChangeText={onChangeText2}
            value={text2}
          />
        </SafeAreaView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  const [text1, onChangeText1] = React.useState("phone");
  const [text2, onChangeText2] = React.useState("contents");
  const [number, onChangeNumber] = React.useState("name");

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <SafeAreaView>
          <TextInput
            style={StyleSheet.title}
            onChangeText={onChangeText1}
            value={text1}
          />
          <TextInput
            style={StyleSheet.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
          <TextInput
            style={StyleSheet.bottom}
            onChangeText={onChangeText2}
            value={text2}
          />
        </SafeAreaView>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator>
      <Stack.Screen name="Send" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}








