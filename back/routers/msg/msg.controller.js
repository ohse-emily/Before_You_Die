require('dotenv').config();
const { Users, Lastwords, Messages } = require('../../models');
const { createPW, email_verify_key, createToken, getUserid } = require('../../JWT');


// mylast words 나의 마지막 말 Lastwords DB에 insert  by 세연 
const mywords = async (req, res) => {
    let { lastword_subject, lastword_content, lastword_sender, user_email } = req.body;
    console.log(lastword_subject, lastword_content, lastword_sender, user_email)
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








module.exports = {
    mywords,
}