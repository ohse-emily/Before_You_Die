import React, {useState} from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet,
  Dimensions,  
} from "react-native";
import {CheckBox} from 'react-native-elements'

const MainPopup = ({handlePopup, value}) => {
  const [itemChecked,setItemChecked] = useState(false)

  const handleCheck =()=>{
    setItemChecked(!itemChecked)
  }

  return (
    <Modal animationType="slide" transparent={true} 
    // visible={props.visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
            <Text>
              팝업이다.
            </Text>
            <View style={styles.buttonContainer}>
                <CheckBox
                    containerStyle={{backgroundColor: 'transparent', borderColor:'transparent', marginRight: -5}}
                    checked={itemChecked}
                    onPress = {handleCheck}
                    title="일주일동안 보지 않기"
                />
                <Text>  |  </Text>
            <TouchableOpacity 
                //   onPress={props.setModalVisible(false)}
            >
                <Text onPress= {handlePopup} style={{fontWeight:'bold'}}>닫기</Text>
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

