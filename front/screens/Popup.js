import React, { useState } from "react";
import {
  View, Modal, TouchableOpacity, StyleSheet,
  Dimensions, TextInput, Alert
} from "react-native";
import { CheckBox } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import Text from './DefaultText';
import PrivacyText from './text/PrivacyText'
import myIp from '../indivisual_ip'

const MainPopup = ({ handlePopup, value, which }) => {
  const [itemChecked, setItemChecked] = useState(false)
  let popupContent;
  let agree;
  if (which === "homescreen") {
    agree = "일주일동안 보지 않기"
    popupContent = "BYD에 오신 것을 환영합니다. / 여기에 개인정보수집 동의 ? 이런거 넣기?"

  } else if (which === "ToSomeoneScreen") {
    agree = "동의합니다."
    popupContent = " 내가 세상에 없다면? \n 누군가에게 남기고 싶은 말을 전해보세요. 저희 BYD 어플에 로그인을 2년동안 안하시면 해당 email 또는 핸드폰 번호로 대신 말씀을 전해드리겠습니다.  "

  } else if (which == "ventingScreen") {
    agree = "네! 잘 알겠습니다."
    // 아래 STRING 값의 빈칸들도 값이므로 삭제하지 말아주세요! by 세연 
    popupContent = "             < 안 내 문 > \n \n 고해성사에 적는 어떤 말도 기록되거나 저장되지 않습니다. \n \n 데이터 베이스에 내용이 도착하지도, 저장되지 않으며 심지어 개발자도 볼 수 없습니다.\n \n 철저한 익명과 비밀을 보장해드리므로써 그동안 어딘가에 털어 놓고 싶었던 나의 이야기를 적고 하늘로 훌훌 날려보내 보세요!"

  } else if (which == "handlePermission") {
    agree = "동의합니다"
    popupContent = PrivacyText.PrivacyText

  }
  const handleCheck = () => {
    setItemChecked(!itemChecked)
  }


  return (
    <Modal animationType="slide" transparent={true}
    // visible={props.visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>

          <ScrollView style={styles.textScroll}>
            <Text style={styles.scrolltext}>
              {popupContent}
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <CheckBox
              containerStyle={{ backgroundColor: 'transparent', borderColor: 'transparent', marginRight: -5 }}
              checked={itemChecked}
              onPress={handleCheck}
              title={agree}
            />
            <Text>  |  </Text>
            <TouchableOpacity
              //   onPress={props.setModalVisible(false)}
              onPress={() => handlePopup(itemChecked)}
            >
              <Text style={{ fontWeight: 'bold' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};



const SubPopup = ({ which, setChangeOk, beforeUserNickname , setUserNickname})=>{

  const [text, onChangeText] = React.useState("");
  let popupContent
  if(which == "ChangeNickname"){
    popupContent = "바꿀 닉네임을 입력하세요"
  }


  const changeNicOk = async ()=>{
    
    
    let url = `${myIp}/user/nickname_check`
    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user_nickname:text, before_nickname: beforeUserNickname}),
    }
    let response = await fetch(url,options)
    let data = await response.json()
    if(data.result===false){
      Alert.alert("","이미 존재하는 아이디입니다",
    )
    return;
    }else{
      setChangeOk(false)
      setUserNickname(text)
    }
  }
  

  const changeNickcancle = ()=>{
    setChangeOk(false)
  }

  return(
    <Modal animationType="slide" transparent={true}
    // visible={props.visible}
    >
      <View style={styles.SubBackground}>
        <View style={styles.SubContainer}>
            <Text style = {styles.SubText}>
              {popupContent}
            </Text>
            <TextInput placeholder = "nickname" 
            style = {styles.SubTextInput} 
            onChangeText = {onChangeText}
            >
            </TextInput>
            <TouchableOpacity onPress = {changeNicOk}>
              <Text>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {changeNickcancle}>
              <Text>취소</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({

  // main 팝업
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalContainer: {
    width: '70%',
    height: '70%',
    margin: 'auto',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    width: '100%',
    height: '10%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  },
  textScroll: {
    marginBottom: 30,
    
  },
  scrolltext:{
    fontSize:18,
  },

  // sub 팝업
  SubBackground:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  SubContainer:{
    width: '70%',
    margin: 'auto',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: 'white',
  },
  SubTextInput:{
    marginTop: '5%',
    width: '70%',
    borderWidth:1
  }
  // SubText:{
  //   fontSize: 18,
  // }
});

module.exports = {
  MainPopup,
  SubPopup,
};
