require('dotenv').config();
const { Sequelize } = require('../../models')
const { Users, Lastwords, Messages, Chat, Chatting } = require('../../models');


// chat room db insert by 세연 
const addchat = async (req, res) => {
    console.log('addchat req body =', req.body)
    let { user_email, chat_name } = req.body
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
const getchat = async (req, res) => {
    let data = { result: false }
    try {
        let result = await Chat.findAll()
        console.log(result)
        data.result = true,
            data.gotchats = result;
    } catch (e) {
        console.log('getchat findall failed, ERROR = ', e)
    }
    res.json(data)
}

// chatting  메세지 보내기 by 세연 
const sendmsg = async (req, res) => {
    let { user_email, chat_name, chatting_msg } = req.body;
    let result = { insert: false, select: false }
    try {
        // 메세지 보내는 사람 nickname, user_image 가져오기
        let getNickname = await Users.findOne({
            where: { user_email }
        })
        let { user_nickname, user_image } = getNickname.dataValues;
        // 채팅방 room 고유 id no. 얻기 
        let getChatroomNo = await Chat.findOne({
            where: { chat_name }
        })
        let chatroom_no = getChatroomNo.dataValues.id;
        await Chatting.create({
            chatroom_no, chat_name, user_email, user_nickname, chatting_msg, user_profile: user_image,
        })     

        result.insert = true;
    } catch (e) {
        console.log('Chatting inserting info failed , ERROR=', e)
    }

    // 채팅 history 가져오기 
    try {
        let getChatHistory = await Chatting.findAll({
            where: { chat_name },
            order: [['chatting_time', 'ASC']],
        })
        result.select = true;
        result.data = getChatHistory
    } catch (e) {
        console.log('Getting chat history failed, Error=', e)
    }
    res.json(result)
}

// chat 채팅 내용 history 가져오기 (user_email join해서 가져오기) by 세연 
const chat_history = async (req, res) => {
    console.log(req.body)
    let { chat_name } = req.body;
    let result = { result: false, }
    let getChatHistory = await Chatting.findAll({
        where: { chat_name },
        order: [['chatting_time', 'ASC']],
    })
    if (getChatHistory.length > 0) {
        result.result = true;
        result.data = getChatHistory;
        res.json(result)
    }
}

// PENDING - 1차 업뎃 이후 ㄱㄱ ! 
// chatHome에 미리 chatting 내용 로드해서 마지막에 말한 채팅 내용 & 프로필 사진을 보이도록 by세연 
const chat_athome = async(req,res)=>{
    console.log('도착햇숴요')
    let result = await Chatting.findAll({
        limit:1,
        order:[['chatting_time', 'DESC']]
    })
    console.log(result)
}

module.exports = {
    addchat, getchat, sendmsg, chat_history,chat_athome, 
}