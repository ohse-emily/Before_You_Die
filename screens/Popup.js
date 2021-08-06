import React, {useState} from "react";
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  // CheckBox
} from "react-native";

import { CheckBox } from 'react-native-elements';

const MainPopup = (props) => {
  const [itemChecked,setItemChecked] = useState(false)

  return (
    <Modal animationType="slide" transparent={true} 
    // visible={props.visible}
    >

      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
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
            <View style={styles.buttonContainer}>
                <CheckBox
                    containerStyle={{backgroundColor: 'transparent', borderColor:'transparent', marginRight: -5}}
                    checked={itemChecked}
                    onPress = {()=>setItemChecked(!itemChecked)}
                    title="일주일동안 보지 않기"
                />
                <Text>|</Text>
            <TouchableOpacity 
              style={{padding:20}}
              onPress = {()=>props.handlePopup()}
            >
                <Text style={{fontWeight:'bold'}}>닫기</Text>
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

