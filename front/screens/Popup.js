import React, {useState} from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet,
  Dimensions,  
} from "react-native";
import {CheckBox} from 'react-native-elements'

<<<<<<< HEAD
const MainPopup = ({handlePopup, value, which}) => {
=======
const MainPopup = ({handlePopup, value, which,}) => {
>>>>>>> b01496e62fca57f30e4c05cefe8c7f00c1eb7c59
  const [itemChecked,setItemChecked] = useState(false)
  let popupContent;
  let agree;
  if(which==="homescreen"){
    agree = "일주일동안 보지 않기"
    popupContent = "BYD에 오신 것을 환영합니다. / 여기에 개인정보수집 동의 ? 이런거 넣기?"
  }else if(which==="ToSomeoneScreen"){
    agree = "동의합니다."
    popupContent = " 내가 세상에 없다면? 누군가에게 남기고 싶은 말을 전해보세요. 저희 BYD 어플에 로그인을 2년동안 안하시면 해당 email 또는 핸드폰 번호로 대신 말씀을 전해드리겠습니다.  "
  }else if(which=="ventingScreen"){
    agree= "네! 잘 알겠습니다."
    popupContent = "고해성사에 적는 어떤 말도 기록되거나 저장되지 않습니다. 데이터 베이스에 저장되지 않으며 개발자도 볼 수 없습니다. 철저한 익명과 비밀을 보장해드리므로써 그동안 어딘가에 말하고 싶었던 본인만의 이야기를 하늘로 훌훌 날려보내 보세요! "
  }

  const handleCheck =()=>{
    setItemChecked(!itemChecked)
  }

<<<<<<< HEAD
=======

>>>>>>> b01496e62fca57f30e4c05cefe8c7f00c1eb7c59
  return (
    <Modal animationType="slide" transparent={true} 
    // visible={props.visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text>
              {popupContent}
            </Text>
            <View style={styles.buttonContainer}>
                <CheckBox
                    containerStyle={{backgroundColor: 'transparent', borderColor:'transparent', marginRight: -5}}
                    checked={itemChecked}
                    onPress = {handleCheck}
                    title={agree}
                />
                <Text>  |  </Text>
            <TouchableOpacity 
                //   onPress={props.setModalVisible(false)}
            >
                <Text onPress= {()=>handlePopup(itemChecked)} style={{fontWeight:'bold'}}>닫기</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};
export default MainPopup;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modalContainer:{
    width:'70%',
    height:'70%',
    margin: 'auto',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: 'white',
  },
  buttonContainer:{
    width:'100%',
    height:'10%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
  }
});

