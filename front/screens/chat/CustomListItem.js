import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import myIp from '../../indivisual_ip';
import axios from 'axios';

// 채팅 메인 홈 screen render by 세연
const CustomListItem = ({ id, chatName, enterChat }) => {

    const [chatMessages, setChatMessages] = useState([])

    // PENDING by 세연 
    // useEffect(()=>{
    //     const getChatMsg= async()=>{
    //         let result = await axios.get(`http://${myIp}/chat/chat_athome`) 
    //         console.log(result)

    //         // let sendingResult = await axios(options)
    //         // let gotresult = sendingResult.data;
    //         // setChatMessages(gotresult.data)
    //     }
    //     getChatMsg();
    // },[])



    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>

            <ListItem.Content>
                <View style={styles.listItemContainer}>
                    <View rounded style={styles.listItemNo}>
                        <Text>
                            {id}
                        </Text>
                    </View>
                    <Avatar
                        rounded
                    // source={{uri:}}
                    />
                    <View>
                        <ListItem.Title style={{ fontWeight: '800' }}>
                            {chatName}
                        </ListItem.Title>
                        {/* 채팅 미리보기 => 원하는 내용을 써도 될듯 !? */}
                        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                            건전하고 즐거운 이야기 :)
                        </ListItem.Subtitle>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
    },
    listItemNo: {
        // width:20,
        // height:20,
        padding: 10,
    }
})
