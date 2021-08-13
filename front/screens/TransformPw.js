import React from 'react';
 import { Alert, Button, TextInput, View } from 'react-native';
 import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
 TransformPw = () => {
    return(
   <Formik
     initialValues={{ beforePw: '' , beforePwCheck: '', afterPw: '', afterPwCheck: ''}}
     onSubmit={values => {
        if(values.beforePw != values.beforePw){
            Alert.Alert('비밀번호가 일치하지 않습니다')
        }else if(values.afterPw != values.afterPwCheck){
            Alert.Alert('비밀번호가 일치하지 않습니다')
        }

        AsyncStorage.getItem('@email_key', async (err,result)=>{
            let data = {email: result, beforePw: values.beforePw, afterPw: values.afterPw}
            let url = 'http://172.30.1.40:3000/user/transformPw'
            let options = {method: 'POST', 
                            body: JSON.stringify(data), 
                            headers:{'Content-Type': 'application/json'}
                        }
            let response = await fetch(url, options)
            let result2 = await response.json()
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
           onChangeText={handleChange('beforePwCheck')}
           onBlur={handleBlur('beforePwCheck')}
           value={values.beforePwCheck}
           placeholder={'비밀번호 확인'}
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