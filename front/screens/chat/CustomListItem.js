import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

// 채팅 메인 홈 screen render by 세연
const CustomListItem = ({ id, chatName, enterChat }) => {
    console.log(id, chatName,)

    return (
        <ListItem onPress ={()=> enterChat(id,chatName)} key={id} bottomDivider>
            <ListItem.Content>
                <View style={styles.listItemContainer}>
                    <View rounded style={styles.listItemNo}>
                        <Text>
                            {id}
                        </Text>
                    </View>
                    <View>
                        <ListItem.Title style={{ fontWeight: '800' }}>
                            {chatName}
                        </ListItem.Title>
                        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                            ABC
                        </ListItem.Subtitle>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({
    listItemContainer:{
        flexDirection:'row',
    },
    listItemNo:{
        // width:20,
        // height:20,
        padding:10,
    }
})
