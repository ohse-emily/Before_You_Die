import React from 'react';
 import { Alert, Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from './DefaultText';
 
const TransformPw = ({navigation}) => { // 비밀번호 변경 by 성민
    return(
   <Formik
     initialValues={{ beforePw: '' , afterPw: '', afterPwCheck: ''}}
     onSubmit={values => {
        console.log(values)
        if(values.afterPw != values.afterPwCheck){
            Alert.alert('비밀번호가 일치하지 않습니다')
            return
        }
        console.log(values)
        if(values.afterPw.length < 6){
          Alert.alert('비밀번호는 6자리 이상으로 해주세요') 
            return
        }

        AsyncStorage.getItem('@email_key', async (err,result)=>{
            let data = {email: result, beforePw: values.beforePw, afterPw: values.afterPw}
            let url = 'http://192.168.200.112:3000/user/transformPw'
            let options = {method: 'POST', 
                            body: JSON.stringify(data), 
                            headers:{'Content-Type': 'application/json'}
                        }
            let response = await fetch(url, options)
            let result2 = await response.json()

            if(result2.result==false){
              Alert.alert(result2.msg)
              return
            }else{
              Alert.alert(result2.msg)
              navigation.navigate('Login')
            }
        })

     }}
   >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
         <TextInput
           onChangeText={handleChange('beforePw')}
           onBlur={handleBlur('beforePw')}
           value={values.beforePw}
           placeholder={'비밀번호'}
         />
        <TextInput
           onChangeText={handleChange('afterPw')}
           onBlur={handleBlur('afterPw')}
           value={values.afterPw}
           placeholder={'바꿀 비밀번호'}
         />
        <TextInput
           onChangeText={handleChange('afterPwCheck')}
           onBlur={handleBlur('afterPwCheck')}
           value={values.afterPwCheck}
           placeholder={'바꿀 비밀번호 확인'}
         />
         <Button onPress={handleSubmit} title="Submit" />
       </View>
     )}
   </Formik>
    )
}

export default TransformPw