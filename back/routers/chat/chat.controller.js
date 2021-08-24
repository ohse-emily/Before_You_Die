require('dotenv').config();
const { Sequelize } = require('../../models')
const { Users, Lastwords, Messages, Chat, Chatting } = require('../../models');
const { findOne } = require('../../models/users');

// chat room db insert by 세연 
const addchat = async(req, res) => {
    console.log('addchat req body =', req.body)
    let {user_email, chat_name} = req.body
    let result = { result: true }
    try {
        await Chat.create({
            user_email, chat_name,
        })
        let getChats = await Chat.findAll({})
        console.log(getChats)
        result.gotchats = getChats;
    } catch (e) {
        console.log('chat DB insert failed , ERROR=', e)
        result.result = false;
    }
    console.log(result)
   
    res.json(result)
}

// chat home screen 에서 현재 존재하는 chatroom 가져오기 by axios  by 세연 
const getchat = async(req,res)=>{
    let data = {result:false}
    try{
        let result = await Chat.findAll()
        console.log(result)
        data.result = true,
        data.gotchats = result;
    }catch(e){
        console.log('getchat findall failed, ERROR = ',e)
    }
    res.json(data)
}

// chatting  메세지 보내기 by 세연 
const sendmsg = async(req,res)=>{
    let {user_email, chat_name, chatting_msg} = req.body;
    let result = {result:false}
    try{
        // 메세지 보내는 사람 nickname 얻기
        let getNickname= await Users.findOne({
            where:{user_email}
        })
        let user_nickname = getNickname.dataValues.user_nickname;
        // 채팅방 room 고유 id no. 얻기 
        let getChatroomNo = await Chat.findOne({
            where:{chat_name}
        })
        let chatroom_no = getChatroomNo.dataValues.id;
        await Chatting.create({
            chatroom_no, chat_name, user_email, user_nickname, chatting_msg, 
        })
        result.result = true;
    }catch(e){
        console.log('Chatting inserting info failed , ERROR=', e)
    }
    res.json(result)
}


module.exports = {
    addchat, getchat, sendmsg,
}