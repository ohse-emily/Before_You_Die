import React, { useEffect,useState } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios'

// 너의 이야기 click -> db (lastwords)에서 랜덤 1 개 FETCH 
function YourwordsShowScreen({ navigation }) {
    const [yourword, setYourword] = useState(null)

    useEffect(()=>{
        const fetchYourword = async()=>{
            axios.get('http://192.168.0.16:3000/msg/yourwords')
            .then(()=>{

            }).catch((e)=>{
                console.log('Axios failed, ERROR => ',e)
            })


            // try{
            //     let yourwordRandom = await fetch('http://192.168.0.16:3000/msg/yourwords', {
            //         method: 'GET'
            //     })
            //     console.log(yourwordRandom)
            //     let yourwordJSON = yourwordRandom.json()
            //     setYourword(yourwordJSON)
            // }catch(e){
            //     console.log('useEffect- Fetch-yourwords - failed')
            // }
        }
        fetchYourword();
    },[])





    return (
        <View>
            <Text>
                {yourword}
            </Text>
        </View>
    )
}

export default YourwordsShowScreen
