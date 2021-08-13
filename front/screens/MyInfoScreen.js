
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, Alert, ScrollView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyInfoScreen = ({ navigation }) => {
  // 메시지를 담아놓는 state - 신우
  const [messagesList, setMessagesList] = useState([])
  const [wordsList, setWordsList] = useState([])
  const [userId, setUserId] = useState('')
  const [userImg, setUserImg] = useState('../assets/icon.png')
  // 위 messagesList 값을 받아왔는지 알려주는 state - 신우
  const [gotData, setGotData] = useState(false)

  useEffect(() => {
    // sendToken만 쓰면 무한정 받아오기 때문에 gotData 조건을 추가하여 화면 접속 시 한 번만 받아오도록 함 - 신우
    sendToken()
    console.log('변함')
  }, [gotData])

  const deleteAcc = () =>
    Alert.alert("잠깐만요! ", "정말로 탈퇴하시겠습니까? (。_。)...",
      [
        {
          text: "취소",
          onPress: () => console.log("user 탈퇴하기 Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "탈퇴하기", onPress: async () => {
            console.log(" user 탈퇴하기 clicked")

            let url = 'http://192.168.0.22:3000/user/deleteacc/'
            let response = await fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify({ userId }), // data can be `string` or {object}!
              headers: {
                'Content-Type': 'application/json'
              }
            });
            let getData = await response.json()
            const { goBackMain } = getData
            console.log(goBackMain)
            try {
              if (goBackMain) {
                alert('회원 탈퇴가 완료되었습니다.')
              } else {
                alert('회원 탈퇴 중 오류가 발생하였습니다.')
              }
            } catch (e) {
              alert('서버와의 접속이 원활하지 않습니다. 잠시 후 다시 시도해주세요.')
              console.log( 'deleteAccError = ', e)
            }
            console.log(goBackMain, '회원탈퇴시 나오는 goBackMain 값 ')
            // 회원 탈퇴 시 AsyncStorage 저장한 정보 삭제 by 세연 
            AsyncStorage.clear(); 
            navigation.navigate('Auth')
            // try{
            //     if(getData.proceed==true){
            //         navigation.navigate("MainApp")
            //         storeData(getData.token, values.user_email)
            //     }
            //     else if(getData.proceed == false && getData.type == 'noverified'){
            //         alert('이메일 인증을 완료해주세요.')
            //     } else if(getData.proceed == false && getData.type == 'nouser'){
            //         alert('아이디와 비밀번호를 확인해주세요')
            //     }
            // } catch(e){
            //     console.log(e)
            // }
          }
        }
      ]
    );

  const logout = () =>
    Alert.alert("로그아웃", "(. ❛ ᴗ ❛.) 로그아웃 하시겠습니까?  ",
      [
        {
          text: "취소",
          onPress: () => { console.log("Cancel Pressed"); },
          style: "cancel"
        },
        {
          text: "로그아웃", onPress: () => {
            console.log("OK Pressed");
            // 나중에 주석 해제해야 로그아웃 처리가 됨 - 신우
            AsyncStorage.removeItem('@storage_Key');  // asyncstorage clear를 안해야 일주일간 보지 않음이 작동이 됨 by 성민
            // 오류 수정 by 세연 멋졍
            navigation.navigate('Auth')
          }
        }
      ]
    );

  // 토큰을 이용하여 회원정보 가져오기 - 신우
  const sendToken = async () => {
    console.log('샌드토큰 실행)')
    const userToken = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        // 스토리지에 저장된 토큰값을 가져옴 - 신우
        return value;
      } catch (e) {
        // error reading value
        console.log(e)
      }
    }
    userToken()
      .then(data => {
        if (data !== null) {
          getInfo(data)
        } else {
          // 만약에 대비하여 만들어놓은 장치로, - 신우
          // 토큰이 존재하지 않는데 회원정보 페이지를 보면 안되기 때문에 
          // 설정해놓음. 맨 처음 페이지로 가도록 해놔야 하는데 네비 수정 후 주석 해제하기. 
          alert('토큰이 만료되었습니다. 다시 로그인을 해주세요 :) ')
          // navigation.navigate('RootStack')} 
        }
      })
      .catch((e) => {
        console.log(e)
      })

    const getInfo = async (token) => {  // 토큰값으로 디비를 조회하는 부분
      let url = 'http://192.168.0.22:3000/user/userinfo/'
      let value = { tokenValue: token }
      let response = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(value), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let getData = await response.json()

      setMessagesList(getData[1])
      setWordsList(getData[2])
      setGotData(true)
      setUserId(getData[0].user_email)

    }
  }


  // 교수님 도움받은 구간
  const deleteMsgHandler = async (id, msg_user_email) => {
    // 선택한 id에 해당하는 값과 작성자(이용자 본인 유저아이디)를 넘겨 서버쪽에서 처리 - 신우
    let url = 'http://192.168.0.22:3000/user/deletepost/'
    let data = { id, msg_user_email }
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const getData = await response.json()
    return getData
  }

  const deleteWordHandler = async (id, word_user_email) => {
    // 선택한 id에 해당하는 값과 작성자(이용자 본인 유저아이디)를 넘겨 서버쪽에서 처리 - 신우
    let url = 'http://192.168.0.22:3000/user/deleteword/'
    let data = { id, word_user_email }
    let response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const getData = await response.json()
    return getData
  }

  return (

    <View style={styles.mypage_wrap}>
      <ScrollView>
        <View style={styles.profile_image_container}>
          <Image
            style={styles.tinyLogo}
            // 고객의 프로필 사진 보이도록 만들기 

            source={
              require('../assets/user_.png')
            }
          />

          {/* <Text>hye1209cj@naver.com</Text>    
        </View>
        <View style={styles.mypage_menu}>
          <Text>나의 마지막 말 </Text> */}

          {/* 요 아래에 고객의 email 주소 보이도록 해야할것 같아욥 * + css */}
          <Text>{userId}</Text>
        </View>
        <View style={styles.mypage_container}>
          <TouchableOpacity
            style={styles.mypage_menu}
            onPress={() => {
              navigation.navigate('MyWordsHistory', {
                list: wordsList, deleteWordHandler: deleteWordHandler
              })
            }}
          >
            <Text style={styles.mypage_text}>나의 마지막 말</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mypage_menu}
            // 함수를 넘기는 것이 아니라 값 자체를 넘겨받음 - 신우
            onPress={() => {
              navigation.navigate('MyMessages', {
                list: messagesList, deleteMsgHandler: deleteMsgHandler
              })
            }}
          >
            <Text style={styles.mypage_text}>나의 예약 문자/이메일</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mypage_menu}
          onPress={()=>{navigation.navigate('TransformPw')}}>
            <Text style={styles.mypage_text}>비밀번호 변경</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mypage_menu}>
            <Text style={styles.mypage_text}>내 결제</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mypage_out_container}>
          <View style={styles.mypage_out}>
            <Text style={styles.mypage_out_text} onPress={logout}>로그아웃</Text>
          </View>
          <View style={styles.mypage_out}>
            <Text style={styles.mypage_out_text} onPress={deleteAcc}>회원탈퇴</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

export default MyInfoScreen

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
  mypage_container: {
    width:  '100%',
    height: 500,
    alignItems: 'center',
    // backgroundColor: 'red',

  },
  mypage_menu: {
    borderColor: '#DCDCDC',
    borderWidth:1,
    width: '75%',
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    justifyContent:'center'
  
  },
  mypage_text:{
    fontSize: 17,
    textAlign: 'center',
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

