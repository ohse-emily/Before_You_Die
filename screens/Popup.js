import React, {useState} from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";

import { CheckBox } from 'react-native-elements';

import   {
    ModalContainer,
    ButtonContainer,
} from './../components/styles'

const Popup = () => {
  const [itemChecked,setItemChecked] = useState(false)

  return (
    <Modal animationType="slide" transparent={true} 
    // visible={props.visible}
    >

      <View style={styles.modalBackground}>
        <ModalContainer>
            <Text>
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Aliquam condimentum lectus id malesuada 
            aliquam. Sed posuere, felis vitae porta 
            dapibus, quam dolor commodo sapien, 
            vel dapibus tellus dui non mauris. 
            Nullam eu sodales quam, 
            fringilla maximus nisl. Fusce ut tempus dui. 
            Sed hendrerit erat ac quam tristique, 
            sit amet iaculis neque lobortis. 
            Pellentesque tincidunt neque quis pulvinar 
            bibendum. Suspendisse potenti. Phasellus 
            volutpat leo eu quam iaculis finibus. 
            Vestibulum eleifend ex sit amet luctus 
            dapibus. Quisque vehicula nisi nec aliquam 
            vestibulum. Suspendisse nulla mi, 
            pretium a convallis id, venenatis aliquet 
            lorem.
            </Text>
            <ButtonContainer>
                <CheckBox
                  // checked = {()=>{setItemChecked(!itemChecked); console.log(itemChecked)}}
                  onPress = {()=>{
                    setItemChecked(!itemChecked); 
                    console.log(itemChecked);

                  }}
                />
                <Text>일주일동안 보지 않기</Text>
                <Text>  |  </Text>
            <TouchableHighlight 
                //   onPress={props.setModalVisible(false)}
            >
                <Text>닫기</Text>
            </TouchableHighlight>
            </ButtonContainer>
        </ModalContainer>
      </View>
    </Modal>
  );
};
export default Popup;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },

});