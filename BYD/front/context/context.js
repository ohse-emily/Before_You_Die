import React from 'react'

const initialState = {
    user_info: [
        { userNickname: '', userEmail: '' }
    ]
}

// 로그인 시 contex 저장소에 user 정보 저장 by세연 
const Context = React.createContext(initialState)


export default Context 