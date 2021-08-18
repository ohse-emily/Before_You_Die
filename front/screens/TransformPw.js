import React from 'react';
import { Alert, Button, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './DefaultText';

const TransformPw = ({ navigation }) => { // 비밀번호 변경 by 성민
  return (
    <Formik
      initialValues={{ beforePw: '', afterPw: '', afterPwCheck: '' }}
      onSubmit={values => {
        console.log(values)
        if (values.afterPw != values.afterPwCheck) {
          Alert.alert("", '비밀번호가 일치하지 않습니다 :(')
          return
        }
        console.log(values)
        if (values.afterPw.length < 6) {
          Alert.alert("", '비밀번호는 6자리 이상으로 설정해주세요 :) ')
          return
        }

        AsyncStorage.getItem('@email_key', async (err, result) => {
          let data = { email: result, beforePw: values.beforePw, afterPw: values.afterPw }
          let url = 'http://192.168.0.29:3000/user/transformPw'
          let options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
          }
          let response = await fetch(url, options)
          let result2 = await response.json()

          if (result2.result == false) {
            Alert.alert("", result2.msg)
            return
          } else {
            Alert.alert("", result2.msg)
            navigation.navigate('Login')
          }
        })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.changePwContainer}>
          <Text style={styles.changePwText}>
            비밀번호 변경하기
          </Text>
          <TextInput
            onChangeText={handleChange('beforePw')}
            onBlur={handleBlur('beforePw')}
            value={values.beforePw}
            placeholder={'현재 비밀번호'}
            style={styles.changePwTextInput}
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={handleChange('afterPw')}
            onBlur={handleBlur('afterPw')}
            value={values.afterPw}
            placeholder={'새로운 비밀번호'}
            style={styles.changePwTextInput}
            secureTextEntry={true}
          />
          <TextInput
            onChangeText={handleChange('afterPwCheck')}
            onBlur={handleBlur('afterPwCheck')}
            value={values.afterPwCheck}
            placeholder={'새로운 비밀번호 확인'}
            style={styles.changePwTextInput}
            secureTextEntry={true}
          />
          <TouchableOpacity onPress={handleSubmit} style={styles.changePwBtn}>
            <Text style={styles.changPwBtnText}>비밀번호 변경하기</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  )
}

export default TransformPw

const styles = StyleSheet.create({
  changePwContainer: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  changePwText: {
    fontSize: 28,
    marginBottom: 20,
  },
  changePwBtn: {
    width: '50%',
    height: 40,
    marginTop: 30,
    backgroundColor: 'lavender',
    justifyContent: 'center',
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',

  },
  changePwTextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  changPwBtnText: {
    fontSize: 17,
  }
})