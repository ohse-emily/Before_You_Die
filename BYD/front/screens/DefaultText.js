'use strict'

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native'

// custum font 설정 component by 세연 
const DefaultText = ({ children, style }) => {

    // 배열 형식으로 폰트 fontStyle 변수에 담기 
    let fontStyle = [{ fontFamily: 'BMEULJIROTTF' }]
    if (style) {
        // style 이 Array 라면 concat으로 합치기 
        if (Array.isArray(style)) {
            fontStyle = fontStyle.concat(style)
        } else {
            // Array가 아니라면 push하기 
            fontStyle.push(style)
        }
    }

    return (
        <Text style={fontStyle} >
            {children}
        </Text>
    )
}

export default DefaultText

