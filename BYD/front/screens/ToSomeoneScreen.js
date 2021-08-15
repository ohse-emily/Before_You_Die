import * as React from 'react';
import {useState} from 'react';
import { Button, View, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MainPopup from './Popup'
import Text from './DefaultText';

function ToSomeone({ navigation }) {
  const [popupToSomeone, setPopupToSomeone] = useState(true)
  const PopupToFn = () => {
    setPopupToSomeone(!popupToSomeone)  
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {popupToSomeone ?
        (<MainPopup
          value={popupToSomeone}
          handlePopup={PopupToFn}
          which={"ToSomeoneScreen"}
        />
        ) : (
          <Text />
        )}
      <View style={{ margin: 10 }, { width: '50%' }}>
        <Button
          title="이메일 보내기"
          onPress={() => navigation.push('SendingEmail')}
        />
      </View>
      <View style={{ height: 30 }}>
      </View>
      <View style={{ margin: 10 }, { width: '50%' }}>
        <Button
          title="문자 보내기"
          color="#f194ff"
          onPress={() => navigation.navigate('SendingMSG')}
        />
      </View>
    </View>
  );
}

export default ToSomeone



