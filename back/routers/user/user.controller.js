require('dotenv').config();
const { sequelize, Users, Lastwords, Messages } = require('../../models/index');
const { createPW, email_verify_key, createToken, getUserid } = require('../../JWT');
const nodemailer = require('nodemailer');
// const sequelize = require('sequelize')

let join = async (req, res) => {
    let { fullName, email, password, user_image } = req.body
    console.log(fullName, email, password, user_image)
    
    // 이메일 & 닉네임 중복 검사 by 세연 
    let join_result = {result:true, msg:'입력해주신 이메일로 인증 url을 보내드렸습니다. 인증을 진행해주세요! :)'};
    let emailCheck = await Users.findAll({where:{ user_email:email}})
    let nickNameCheck = await Users.findAll({where:{ user_nickname:fullName}})
    console.log('emailCheck = ',emailCheck, 'nickName=', nickNameCheck)

    if(emailCheck.length > 0){
        join_result.result = false;
        join_result.msg = '이미 존재하는 이메일입니다';
        res.json(join_result)
        return ; 
    }else if(nickNameCheck.length > 0 ){
        join_result.result = false;
        join_result.msg = '이미 존재하는 닉네임입니다';
        res.json(join_result)
        return ; 
    }
    
    let email_key = email_verify_key();
    let pwJWT = createPW(password)
    
    // front 에서 받아온 정보 db Users 에 저장 by 성민
    await Users.create({
        user_nickname: fullName,
        user_email: email,
        user_password: pwJWT,
        user_image: user_image,
        email_verify_key: email_key,
    })

    await sequelize.query(`update users set join_date = CONVERT_TZ(now(), "+0:00", "+9:00") where user_email = '${email}'`)

    // email 인증 메일 보내기 by 세연 
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        post: 465,
        secure: true,
        auth: {
            user: process.env.GoogleID,
            pass: process.env.GooglePW
        }
    })
    let url = `http://` + req.get('host') + `/user/confirmEmail?key=${email_key}`;
    let options = {
        from: '<BYD> byd.dothis@gmail.com',
        to: email,
        subject: ' BYD 회원가입을 완성해 주세요 :) !  ',
        html: `username 님 안녕하세요,  이메일인증을 위해 url을 클릭해주세요 -> ${url}`
    }

    transporter.sendMail(options, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log('email has been successfully sent.')
        }
        transporter.close();
    })
    res.json(join_result)
}

// 고객이 email url 클릭 시 email_verify 0 -> 1로 변경 by세연 
let confirmEmail = async (req, res) => {
    let email_verify_change = await Users.update(
        { email_verify: 1 }, 
        { where: { email_verify_key: req.query.key } 
    })

    if (email_verify_change == undefined) {
        res.send('<script type="text/javascript">alert("Not verified"); window.location="/"; </script>');
        return 0;
    } else {
        res.send('<script type="text/javascript"> alert("Successfully verified");  </script>');
    } //window.location="/user/login";
}


let login = async (req, res) => {
    let { user_email, user_password } = req.body
    let pwJWT = createPW(user_password)
    let token = createToken(user_email)
    // result default value
    let result = { proceed: false, type: 'nouser' }
    let getUser = await Users.findOne({
        where: {
            user_email,
            user_password: pwJWT
        } // 나중에 pwJWT로 바꾸기
    })
    console.log('getUser=',getUser)
    if (getUser != null && getUser.email_verify == 1) {
        // 로그인 정보와 DB가 일치할 경우 
        console.log('ddd')
        result.proceed=true;
        result.type='verifieduser'
        result.token=token
        let loggedInAt = new Date().toLocaleDateString()
        console.log(loggedInAt,'로긴시간')
        console.log(user_email,'유저이메일')
        await sequelize.query(`update users set login_date = CONVERT_TZ(now(), "+0:00", "+9:00") where user_email = '${user_email}'`)

    } else if (getUser != null && getUser.email_verify == 0){
        //이메일 인증을 못받은 경우 
        console.log('못받음')
        result.type = 'noverified'
    }
    console.log(result)
    res.json(result)
}

let getUserInfo = async (req, res) => {
    let { tokenValue } = req.body
    // 프론트 단으로 던질 정보를 넣을 배열 - 신우 
    let infoArr = []
    console.log(req.body)
    let user_email = getUserid(tokenValue)
    // 유저 정보 가져오기 - 신우 
    console.log(user_email)
    let getUser = await Users.findOne({
        where: {
            user_email,
        }
    })
    // 해당 유저의 메시지 가져오기 - 신우
    let getMessages = await Messages.findAll({
        where: {
            msg_user_email: user_email,
        }
    })

    let getWords = await Lastwords.findAll({
        where: {
            user_email
        }
    })


    // 정보 배열에 유저 정보 및 메시지 정보 삽입 - 신우
    infoArr.push(getUser)
    console.log('1', infoArr)
    infoArr.push(getMessages)
    console.log('2', infoArr)
    infoArr.push(getWords)
    console.log('3', infoArr)


    // 프론트 단으로 전송 - 신우
    // 배열의 0번: 유저인포(객체), 1번: 메시지인포(배열) - 신우
    res.json(infoArr)
}

let deletePost = async (req, res) => {
    let { id, msg_user_email } = req.body
    console.log('userid', req.body, id, msg_user_email)

    let result = await Messages.destroy({
        where: {
            id: id
        }
    })
    console.log(id, '번이 삭제되었음')
    let afterDelete = await Messages.findAll({
        where: {
            msg_user_email,
        }
    })
    res.json(afterDelete)
}

let deleteWord = async (req, res) => {
    console.log(req.body)
    let { id, word_user_email } = req.body
    let result = await Lastwords.destroy({
        where: {
            id: id
        }
    })
    console.log(id, '번이 삭제되었음')
    let afterDelete = await Lastwords.findAll({
        where: {
            user_email: word_user_email,
        }
    })
    res.json(afterDelete)
}

let email_check = async (req, res) => {
    let { email } = req.body
    let result = await Users.findOne(
        {
            where: {
                user_email: email
            }
        }
    )

    if (result == null) {
        res.json({ result: true })
    } else {
        res.json({ result: false })
    }
}


// user 탈퇴 시 절차 by 세연 
let deleteAcc = async (req, res) => {
    let user_email = req.body.userId;
    console.log(user_email)
    try {
        // 1. Users DB 에서 데이터 삭제 
        console.log('11')
        await Users.destroy({  
            where: { user_email }
        })
        console.log('22')
        // 2. Lastwords DB 에서 user_email 개인정보만 변경 
        await Lastwords.update(
            { user_email:'withdrawn_user'}, {where:{user_email}}
        )
        console.log('33')
        // 3. Messages DB 에서 데이터 삭제 (문자/이메일 서비스 중단)
        await Messages.destroy({  
            where: { msg_user_email:user_email}
        })
        console.log('44')
    } catch (e) {
        console.log(`deleting user failed , user_email= ${user_email}`)
    }
    res.json({ goBackMain: true })
}

let transformPw = async(req,res)=> { // 비밀번호 변경 by 성민
    let {email, beforePw, afterPw} = req.body
    JWTbeforePw = createPW(beforePw)
    let result = await Users.findOne({
        where:{
            user_email : email,
            user_password : JWTbeforePw
        }
    })
    
    if (result==null){
        res.json({result: false , msg: '비밀번호를 잘못 입력했습니다'})
    }else{
        JWTafterPw = createPW(afterPw)
        Users.update({ email_verify: 1 }, { where: {email_verify_key:req.query.key} })
        await Users.update({user_password: JWTafterPw},{where:{user_email : email}})
        res.json({result: true, msg: '비밀번호가 변경되었습니다. :)     재로그인을 부탁드립니다.'})
    }
}



module.exports = {
    join, login, confirmEmail, 
    getUserInfo, deletePost, deleteWord, 
    email_check, deleteAcc, transformPw
}
