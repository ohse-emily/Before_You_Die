import React, { useState } from "react";
import {
  View, Modal, TouchableOpacity, StyleSheet,
  Dimensions,
} from "react-native";
import { CheckBox } from 'react-native-elements'
import { ScrollView } from "react-native-gesture-handler";
import Text from './DefaultText';

const MainPopup = ({ handlePopup, value, which }) => {
  const [itemChecked, setItemChecked] = useState(false)
  let popupContent;
  let agree;
  if (which === "homescreen") {
    agree = "일주일동안 보지 않기"
    popupContent = "BYD에 오신 것을 환영합니다. / 여기에 개인정보수집 동의 ? 이런거 넣기?"
  
  } else if (which === "ToSomeoneScreen") {

    agree = "동의합니다."
    popupContent = " 내가 세상에 없다면? 누군가에게 남기고 싶은 말을 전해보세요. 저희 BYD 어플에 로그인을 2년동안 안하시면 해당 email 또는 핸드폰 번호로 대신 말씀을 전해드리겠습니다.  "
  } else if (which == "ventingScreen") {

    agree = "네! 잘 알겠습니다."
    popupContent = "고해성사에 적는 어떤 말도 기록되거나 저장되지 않습니다. 데이터 베이스에 저장되지 않으며 개발자도 볼 수 없습니다. 철저한 익명과 비밀을 보장해드리므로써 그동안 어딘가에 말하고 싶었던 본인만의 이야기를 하늘로 훌훌 날려보내 보세요! "
  } else if (which == "handlePermission") {

    agree = "동의합니다"
    popupContent = "개인정보보호법에 따라 BYD 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적,\
    개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다\
    1. 수집하는 개인정보\
    저희 어플리케이션은 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.\
    \
    회원가입 시점에 BYD가 이용자로부터 수집하는 개인정보는 아래와 같습니다.\
    - 회원 가입 시에 ‘아이디, 비밀번호, 이메일’ 을 필수항목으로 수집합니다.\
    서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.\
    BYD 내의 개별 서비스 이용, 결제 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 \
    해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.\
    \
    2. 수집한 개인정보의 이용\
    BYD 및 BYD 관련 제반 서비스(모바일 웹/앱 포함)의 회원관리, 서비스 개발・제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를 이용합니다.\
    \
    - 회원 가입 의사의 확인, 이용자 식별, 회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.\
    - 콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여, 인구통계학적 분석, 서비스 방문 및 이용기록의 분석, 개인정보 및 관심에 기반한 이용자간 관계의 형성, \
    지인 및 관심사 등에 기반한 맞춤형 서비스 제공 등 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여 개인정보를 이용합니다.\
    - 법령 및 BYD 이용약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재,\
    - 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을 위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.\
    - 유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를 이용합니다.\
    - 이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.\
    - 서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및 광고 게재 등에 개인정보를 이용합니다.\
    - 보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를 이용합니다.\
    \
    3. 개인정보의 보관기간\
    회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기하고 있습니다.\
    참고로 BYD는 ‘개인정보 유효기간제’에 따라 2년간 서비스를 이용하지 않은 회원의 개인정보를 별도로 분리 보관하여 관리하고 있습니다.\
    \
    4. 개인정보 수집 및 이용 동의를 거부할 권리\
    이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있습니다. 회원가입 시 수집하는 최소한의 개인정보, 즉, \
    필수 항목에 대한 수집 및 이용 동의를 거부하실 경우, 회원가입이 어려울 수 있습니다.'"
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
            >
              <Text onPress={()=>handlePopup()} style={{ fontWeight: 'bold' }}>닫기</Text>
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
  textScroll:{
    marginBottom: 30,
  }
});

