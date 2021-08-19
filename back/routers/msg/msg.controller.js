require('dotenv').config();
const { Sequelize } = require('../../models')
const { Users, Lastwords, Messages } = require('../../models');
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
connection.connect();

// byddothis

// mylast words 나의 마지막 말 Lastwords DB에 insert  by 세연 
const mywords = async (req, res) => {
    let { lastword_subject, lastword_content, lastword_sender, user_email } = req.body;
    console.log(user_email, lastword_subject, lastword_content, lastword_sender)
    try {
        await Lastwords.create({
            user_email, lastword_subject, lastword_content, lastword_sender
        })
        console.log("users' Lastwords inserted into DB successfully")
        res.json({ result: true })
    } catch (e) {
        console.log("Inserting Users' Lastwords failed. ERROR = ", e)
        res.json({ result: false })
    }

}


const mymessages = async (req, res) => {
    console.log(req.body)
    let { msg_mobile, msg_email, msg_content, msg_user_email, msg_method } = req.body
    console.log(msg_method)
    try {
        await Messages.create({
            msg_mobile, msg_email, msg_content, msg_user_email, msg_method
        })
        console.log("users' Lastwords inserted into DB successfully")
        res.json({ result: true })
    } catch (e) {
        console.log("Inserting Users' Lastwords failed. ERROR = ", e)
        res.json({ result: false })
    }
    // 전송시간 2년 넣기

}


// ubuntu 점검 실패 
// Your last words 너의 마지막 말을 db에서 하나 랜덤(본인이 쓴 글 제외) 추출 by세연
const yourwords = async (req, res) => {
    const { userEmail } = req.query;
    console.log(userEmail)
    if (userEmail == undefined) {
        let RandomLastword = await Lastwords.findAll({ order: Sequelize.literal('rand()'), limit: 1 })
        if (RandomLastword) {
            console.log(111)
            console.log('(user_email_undefined) Getting yourwords List from db - success !! ', results)
            res.json(results)
        } else {
            console.log(11111)
            console.log('(user_ email_undefined) Getting yourwords List from db Failed, ERROR =', error)
            res.json({ result: false })
        }
    } else {
        connection.query(`select * from Lastwords where user_email != '${userEmail}' order by rand() limit 1 ;`, (error, results) => {
            if (results) {
                console.log(2)
                console.log('Getting yourwords List from db - success !! ', results)
                res.json(results)
            } else {
                console.log(222)
                console.log('Getting yourwords List from db Failed, ERROR =', error)
                res.json({ result: false })
            }
        })
    }
}



module.exports = {
    mywords, mymessages, yourwords,
}