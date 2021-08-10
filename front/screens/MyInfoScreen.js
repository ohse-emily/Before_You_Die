
import React, {useEffect, useState} from 'react';
import { View, Image, StyleSheet, Text, Alert, ScrollView, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyInfoScreen = ({navigation}) => {
    // 메시지를 담아놓는 state - 신우
    const [messagesList, setMessagesList] = useState([])
    const [wordsList, setWordsList] = useState([])
    // 위 messagesList 값을 받아왔는지 알려주는 state - 신우
    const [gotData, setGotData] = useState(false)


    useEffect(()=>{
        // sendToken만 쓰면 무한정 받아오기 때문에 gotData 조건을 추가하여 화면 접속 시 한 번만 받아오도록 함 - 신우
        sendToken()
    },[gotData])


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
            onPress: () => {console.log("Cancel Pressed");},
            style: "cancel"
            },
            { text: "OK", onPress: () => {
            console.log("OK Pressed"); 
            
            // 나중에 주석 해제해야 로그아웃 처리가 됨 - 신우
            AsyncStorage.clear(); 
            //네비 이름 제대로 하기 - 신우
            // Home으로 잘 가지는 것을 보면 navigators가 서로 분리되어 있어서 그런 것이 확실함
            navigation.navigate('Home')}
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
            } catch(e) {
            // error reading value
                console.log(e)
            }
        }
        userToken()
            .then(data=>{
                    if( data !== null){
                        getInfo(data)
                    } else {
                        // 만약에 대비하여 만들어놓은 장치로, - 신우
                        // 토큰이 존재하지 않는데 회원정보 페이지를 보면 안되기 때문에 - 신우
                        // 설정해놓음. 맨 처음 페이지로 가도록 해놔야 하는데 네비 수정 후 주석 해제하기. - 신우
                        alert('토큰이 만료되었습니다. 다시 로그인을 해주세요 :) ')
                        // navigation.navigate('RootStack')} - 신우
                    }
            })
            .catch((e)=>{
                console.log(e)
        })

        const getInfo = async (token) => {
            let url = 'http://localhost:3000/user/userinfo/'
            let value = {tokenValue:token}
            let response = await fetch(url, {
                    method: 'POST', // or 'PUT'
                    body: JSON.stringify(value), // data can be `string` or {object}!
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
            let getData = await response.json()
            setMessagesList(getData[1])
            setWordsList(getData[2])
            setGotData(true)
        }
    }
    

    // 교수님 도움받은 구간
    const deleteMsgHandler = async (id, msg_user_email) =>{
        // 선택한 id에 해당하는 값과 작성자(이용자 본인 유저아이디)를 넘겨 서버쪽에서 처리 - 신우
        let url = 'http://localhost:3000/user/deletepost/'
        let data = {id, msg_user_email}
        let response = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const getData = await response.json()
        return getData 
    }

    const deleteWordHandler = async (id, word_user_email) =>{
        // 선택한 id에 해당하는 값과 작성자(이용자 본인 유저아이디)를 넘겨 서버쪽에서 처리 - 신우
        let url = 'http://localhost:3000/user/deleteword/'
        let data = {id, word_user_email}
        let response = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data), 
            headers:{
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
          <View>
            <Text>마이페이지</Text>
          </View>
          <Button title="zxc"/>
          <Image
            style={styles.tinyLogo}
            source={
              require('../assets/icon.png')
            }
          />
          <Text>hye1209cj@naver.com</Text>
        </View>
        <TouchableOpacity
        style={styles.mypage_menu}
        onPress = {()=>{navigation.navigate('MyWordsHistory',{
            list:wordsList, deleteWordHandler: deleteWordHandler
        })}}
        >
          <Text>나의 마지막말</Text>
        </TouchableOpacity>
        <View style={styles.mypage_menu}>
          <Text>나의 예약 문자 (삭제예정)</Text>
        </View>
        <TouchableOpacity 
        style={styles.mypage_menu}
        // 함수를 넘기는 것이 아니라 값 자체를 넘겨받음 - 신우
        onPress = {()=>{navigation.navigate('MyMessages',{
            list:messagesList, deleteMsgHandler: deleteMsgHandler
        })}}
        >
          <Text>나의 예약 메세지</Text>
        </TouchableOpacity>
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

