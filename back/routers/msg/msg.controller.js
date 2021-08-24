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
    // 혹시나 email 없을 경우 
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
    // 일반적인 경우 (고객 디바이스에 login하면 email 있음)
    // Sequelize 의 table 명은 -> 대문자 / mysql 의 테이블 (리눅스 server) 는 소문자! -> 리눅스 msg.controller.js 내용 변경  
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

const lastwordLikes = async (req, res) => {
    // 전체 엄신우 담당
    console.log(req.query)
    let {user_email, id} = req.query
    //현재 게시물에 대한 정보 get
    let result1 = await Lastwords.findOne({
        where:{id}
    })
    //좋아요 리스트를 가져온다
    let likeList = result1.dataValues.lastword_likes
    // 좋아요 목록이 비었으면 누른 사람의 이메일을 추가함
    if (likeList === null){
        await Lastwords.update({
            lastword_likes:`${user_email} `
        } ,{
            where:{
                id :id
            }
        }
        )
        res.json({msg: 'done'})
    }else{
        //중복검사 식별자. boolean으로 했더니 값을 저장 못해서 배열로 처리함.
        let flag = []
        //좋아요 목록이 비지 않았으면 목록을 쪼개서 닉넴 일치여부 검사
        likeListSplit = likeList.split(' ')
        //좋아요 안에 이름이 있으면 true라는 아이템을 넣을 것
        for(i=0; i<likeListSplit.length; i++){
            if(likeListSplit[i] === user_email){
                flag.push('true')
            }
        }
        
        //중복값이 있으면 리젝트 날림
        if(flag[0] === 'true'){
            res.json({msg: 'rejected'})
        //중복값 없으면 진행
        }else{
            await Lastwords.update({lastword_likes:`${likeList}${user_email} `}, {where:{id : id}})
            res.json({msg: 'done'})
        }
    }
}

const loadFeed = async (req, res) => {
//     console.log('connected')
//     let result = await Messages.findAll({
//         order: [['postWriter', 'DESC']]
//     })
//     res.json({asd:'zxc'})
}

module.exports = {
    mywords, mymessages, yourwords, lastwordLikes,
    loadFeed, 
}