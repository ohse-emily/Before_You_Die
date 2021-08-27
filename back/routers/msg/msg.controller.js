require('dotenv').config();
const { Sequelize, sequelize } = require('../../models')
const { Users, Lastwords, Messages, Reports } = require('../../models');
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
        connection.query(`select * from lastwords where user_email != '${userEmail}' order by rand() limit 1 ;`, async (error, results) => {
            if (results) {
                console.log(results)
                console.log(results[0])
                // 뽑힌 글 ID를 가져와서 해당 게시물의 좋아요 갯수만 가져오기
                let id
                results.length == 0 ? id = -1 : id = results[0].id
                console.log(id)
                let getLikes = await Reports.findAll({
                    where: {
                        post_id: id,
                        type: 0,
                    }
                })
                // 좋아요 갯수
                let numLikes = getLikes.length
                let likedCheck

                //신고 여부를 담을 것
                let reportCheck

                // 해당 게시물에 현재 유저가 좋아요 한 글이 있는지 확인
                let ifLiked = await Reports.findAll({
                    where: {
                        post_id: id,
                        type: 0,
                        user_email: userEmail
                    }
                })

                //신고 여부도 확인
                let ifReported = await Reports.findAll({
                    where: {
                        post_id: id,
                        type: 1,
                        user_email: userEmail
                    }
                })

                ifLiked.length == 0 ? likedCheck = false : likedCheck = true
                ifReported.length == 0 ? reportCheck = false : reportCheck = true
                // 결과가 없음을 프론트 쪽에서 식별하기 위함
                results.push('noResult')


                // 좋아요 갯수와 좋아요 여부를 results에 그냥 push 해서 한 번에 보내버린다.
                results.push({numLikes, likedCheck, reportCheck})

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
    let {user_email, id, type} = req.query
    
    if (type==0){
        // 중복검사 실시, 해당 게시물에 대한 좋아요 또는 신고 기록이 있는지 받아온다.
        let getLikes = await Reports.findAll({
            where: {
                user_email,
                post_id: id,
                type: 0
            }
        })

        // 해당 유저의 좋아요가 없는 경우 등록
        if(getLikes.length===0){
            await Reports.create({
                user_email, 
                post_id: id,
                type
            })
            res.json({msg: 'done'})
        } else{
            // 좋아요가 있으면 거부
            res.json({msg: 'rejected'})
        }
    } else if(type==1){
        let {user_email2} = req.query
        let result = await Reports.findAll({where:{user_email, post_id: id, type:1}})
    
        if (result.length===0){
            await Reports.create({user_email: user_email, type: type, post_id: id})
            
            let Userdata = await Users.findOne({where:{user_email:user_email2}})

            user_score = parseInt(Userdata.dataValues.user_score)+1

            await Users.update({user_score: user_score},{where : {user_email: user_email2}})
            res.json({msg: '신고가 완료되었습니다', flag: false})
        }else{
            res.json({msg: '이미 신고하셨습니다', flag: true})
        }
    }
}

const loadFeed = async (req, res) => {
    console.log(req.query)
    let {user_email} = req.query
    //라이크에서 DB를 가져오는데 좋아요 순서대로 가져온다
    let result = await sequelize.query( 

        //각 게시물마다 좋아요 게시물을 가져온다
        `SELECT 
            A.post_id, A.type, B.id, B.user_email as writer, B.lastword_subject, 
            B.lastword_content, B.lastword_sender, B.lastword_date, 
            count(*) AS howMany 
            FROM reports AS A 
            LEFT JOIN lastwords AS B 
            ON A.post_id = B.id 
            WHERE B.id IS NOT NULL 
            group BY post_id
            ORDER BY howMany DESC LIMIT 20
        ;`
    )
    let newResult = result[0]

    // for(let i=0; i<newResult.length; i++){
    //     let ifLiked = await 
    // }
    //     // console.log(result[0])
    // res.json(result[0])


}

module.exports = {
    mywords, mymessages, yourwords, lastwordLikes,
    loadFeed, 
}