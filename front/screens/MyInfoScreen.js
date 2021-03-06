
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Image, StyleSheet, Alert, ScrollView, Button, TouchableOpacity, Touchable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './DefaultText';
// for image upload
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import myIp from '../indivisual_ip'
import { Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SubPopup} from './Popup'

const MyInfoScreen = ({ navigation }) => {
  // 메시지를 담아놓는 state - 신우
  const [messagesList, setMessagesList] = useState([])
  const [wordsList, setWordsList] = useState([])
  const [userId, setUserId] = useState('')
  const [userNickname, setUserNickname] = useState('')
  // 위 messagesList 값을 받아왔는지 알려주는 state - 신우
  const [gotData, setGotData] = useState(false)
  const [userImg, setUserImg] = useState(null)// userImg = user가 원래 가지고 있는 프로필 사진 (from DB)
  const [changeImg, setChangeImg] = useState(null) // changeImg = user가 사진첩에서 가져온 사진 by  세연 
  const isFocused = useIsFocused();
  const [changeNickname, setChangeNickname] = useState(false)

  useEffect(() => {
    // sendToken만 쓰면 무한정 받아오기 때문에 gotData 조건을 추가하여 화면 접속 시 한 번만 받아오도록 함 - 신우
    sendToken()

  }, [isFocused])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '나의 정보',
      headerTitleAlign: 'center',
    })
  }, [navigation])

  let userIMAGE;
  if (userImg) {
    userIMAGE = { uri: `${myIp}/${userImg}` }
  } else {
    userIMAGE = { uri: changeImg }
  }

  // 프로필 사진 변경 by 세연 
  const changeImage = async () => {
    console.log(1)
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // user가 카메라접근을 허락하면 == granted 
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [4, 4],
      });
      if (!pickerResult.cancelled) {
        setChangeImg(pickerResult.uri);
        setUserImg(null)

        // back end 로 변경한 image file  보내기 
        let apiUrl = `${myIp}/user/pic_upload`;
        let uriParts = pickerResult.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();
        formData.append('file', {
          uri: pickerResult.uri,
          name: `${userId}photo.${fileType}`,
          type: `image/${fileType}`,
        });
        let imgOptions = {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }
        let sendImage = await fetch(apiUrl, imgOptions)
        let res = await sendImage.json()
        console.log('레스', res)
      }
      setChangeImg(pickerResult.uri)
    }

  }


  const changeNicknameFn = async ()=>{
    setChangeNickname(true)
    
  }

  const deleteAcc = () => // 탈퇴 여부 확인하는 부분
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

            let url = `${myIp}/user/deleteacc`
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
              console.log('deleteAccError = ', e)
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

  const logout = () => // 로그아웃 여부 확인하는 부분

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
            navigation.navigate('Main')
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
          alert('로그아웃 되었습니다. 다시 로그인을 진행해주세요 :) ')
          navigation.navigate('Main')
        }
      })
      .catch((e) => {
        console.log(e)
      })

    const getInfo = async (token) => {  // 토큰값으로 디비를 조회하는 부분
      let url = `${myIp}/user/userinfo/`
      let value = { tokenValue: token }
      let response = await fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(value), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      })
      let getData = await response.json()
      console.log(getData)
      setMessagesList(getData[1])
      setWordsList(getData[2])
      setGotData(true)
      setUserImg(getData[0].user_image)
      setUserId(getData[0].user_email)
      setUserNickname(getData[0].user_nickname)

    }
  }


  // 교수님 도움받은 구간
  const deleteMsgHandler = async (id, msg_user_email) => {
    // 선택한 id에 해당하는 값과 작성자(이용자 본인 유저아이디)를 넘겨 서버쪽에서 처리 - 신우
    let url = `${myIp}/user/deletepost`
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
    let url = `${myIp}/user/deleteword/`
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
      {changeNickname && <SubPopup which={"ChangeNickname"} setChangeOk = {setChangeNickname} beforeUserNickname={userNickname} setUserNickname={setUserNickname}/>}
        <View style={styles.myinfoVertical}>
          <TouchableOpacity style={styles.profile_image_container} onPress={changeImage}>

            {userImg || changeImg ? <Image rounded source={userIMAGE} style={{ width: 100, height: 100 }} />
              : <Image rounded source={require('../assets/user_.png')} style={{ width: 100, height: 100 }} />}
          </TouchableOpacity>

          {/* 해당 userid, nickname을 클릭해서 수정 가능하게 TouchableOpacity에서 빼서 css 완료 by세연  */}
          <TouchableOpacity style={{flexDirection:'row', flex:1,justifyContent:'center'}}>
            <Text style={styles.nameAreaA}>{userId}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:'row', flex:1,justifyContent:'center'}} onPress={changeNicknameFn}>
            <Text style={styles.nameAreaB}>{userNickname}</Text>
          </TouchableOpacity>

          <View style={styles.mypage_container}>
            <TouchableOpacity
              style={styles.mypage_menu}
              onPress={() => {
                navigation.navigate('MyWordsHistory', {
                  list: wordsList, deleteWordHandler: deleteWordHandler
                })
              }}
            >
              <Text style={styles.mypage_text}>내가 보낸 이야기</Text>
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
              onPress={() => { navigation.navigate('TransformPw') }}>
              <Text style={styles.mypage_text}>비밀번호 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mypage_menu}
              onPress={() => { navigation.navigate('Service') }}
            >
              <Text style={styles.mypage_text}>서비스 이용약관</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mypage_menu}
              onPress={() => { navigation.navigate('Privacy') }}>
              <Text style={styles.mypage_text}>개인정보 취급방침</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.mypage_out_container}>
            <TouchableOpacity style={styles.mypage_out} onPress={logout}>
              <Text style={styles.mypage_out_text} >로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mypage_out} onPress={deleteAcc}>
              <Text style={styles.mypage_out_text} >회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default MyInfoScreen

const styles = StyleSheet.create({
  profile_image_container: {
    paddingTop: 30,
    alignItems: "center",
  },
  tinyLogo: {
    width: 80,
    height: 80,
  },
  myinfoVertical: {
    justifyContent: 'center',
    flex: 1,

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
    flex: 1,
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },
  mypage_container: {
    width: '100%',
    height: 280,
    alignItems: 'center',
  },
  mypage_menu: {
    borderColor: 'lavender',
    borderWidth: 2,
    width: '75%',
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'ghostwhite',
    justifyContent: 'center',
    borderRadius: 8,
  },
  mypage_text: {
    fontSize: 17,
    textAlign: 'center',
  },
  mypage_out_container: {
    flexDirection: 'row-reverse'
  },
  mypage_out: {
    width: '18%',
    height: 30,
    flexDirection: "row",
    zIndex: 3,
    alignItems: 'flex-end',
    borderRadius: 1,

  },
  mypage_out_text: {
    flexDirection: 'row',
    padding: 5,
    zIndex: 0,
    alignSelf: 'flex-end',
  },
  nameAreaA: {
    marginTop:10,
    marginBottom:0,
  },
  nicknameAreA: {
    marginTop:5,
    marginBottom:10,
    alignItems:'center'
  },
});


