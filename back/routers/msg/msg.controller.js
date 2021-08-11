require('dotenv').config();
const { Users, Lastwords, Messages } = require('../../models');
const { createPW, email_verify_key, createToken, getUserid } = require('../../JWT');


// mylast words 나의 마지막 말 Lastwords DB에 insert  by 세연 
const mywords = async (req, res) => {
    let { lastword_subject, lastword_content, lastword_sender, user_email } = req.body;
    try {
        await Lastwords.create({
            user_email, lastword_subject, lastword_content, lastword_sender
        })
        console.log("users' Lastwords inserted into DB successfully")
    } catch (e) {
        console.log("Inserting Users' Lastwords failed. ERROR = ", e)
    }
    res.json({result:true})
}

// pwJWT = createPW(password)
// Users.create({
//     user_nickname: fullName,
//     user_email : email,
//     user_password : pwJWT,
//     user_image: user_image,
//     email_verify_key:email_key,
// })

const mymessages = async (req, res) => {
    console.log(req.body)
    let {msg_mobile, msg_email, msg_content, msg_user_email, msg_method } = req.body
    console.log(msg_method)
    try {
        await Messages.create({
            msg_mobile, msg_email, msg_content, msg_user_email, msg_method
        })
        console.log("users' Lastwords inserted into DB successfully")
    } catch (e) {
        console.log("Inserting Users' Lastwords failed. ERROR = ", e)
    }
    // 전송시간 2년 넣기
    res.json({result:true})
}






module.exports = {
    mywords, mymessages
}