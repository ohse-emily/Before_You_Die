
import React from 'react';
import { View, Image, StyleSheet, Text, Alert, ScrollView } from 'react-native';


export default function DisplayAnImage() {
  const createTwoButtonAlert = () =>
    Alert.alert("경고", "정말로 탈퇴하시겠습니까?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  const createTwoButtonAlert2 = () =>
    Alert.alert("로그아웃", "로그아웃 하시겠습니까?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

  return (
    <View style={styles.mypage_wrap}>
      <ScrollView>
        <View style={styles.profile_image_container}>
          <View>
            <Text>마이페이지</Text>
          </View>
          <Image
            style={styles.tinyLogo}
            source={
              require('../assets/icon.png')
            }
          />
          <Text>hye1209cj@naver.com</Text>
        </View>
        <View style={styles.mypage_menu}>
          <Text>나의 마지막말</Text>
        </View>
        <View style={styles.mypage_menu}>
          <Text>나의 예약 문자</Text>
        </View>
        <View style={styles.mypage_menu}>
          <Text>나의 예약 메세지</Text>
        </View>
        <View style={styles.mypage_menu}>
          <Text>내 결제</Text>
        </View>
        <View style={styles.mypage_out_container}>
          <View style={styles.mypage_out}>
            <Text style={styles.mypage_out_text} onPress={createTwoButtonAlert2}>로그아웃</Text>
          </View>
          <View style={styles.mypage_out}>
            <Text style={styles.mypage_out_text} onPress={createTwoButtonAlert}>회원탈퇴</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  profile_image_container: {
    paddingTop: 100,
    alignItems: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  mypage_header_text: {
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  mypage_header: {
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  mypage_wrap: {
    backgroundColor: '#F0F8FF',
    height: '100%'
  },
  mypage_menu: {
    width: '100%',
    height: 80,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mypage_out_container: {
    flexDirection: 'row-reverse'
  },
  mypage_out: {
    width: '18%',
    flexDirection: "row",
    zIndex: 0,
    alignItems: 'flex-end'
  },
  mypage_out_text: {
    flexDirection: 'row',
    padding: 5,
    zIndex: 3,
    alignSelf: 'flex-end'
  },
});

