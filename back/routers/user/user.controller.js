require('dotenv').config();
const { Users, Lastwords, Messages } = require('../../models');
const { createPW, email_verify_key, createToken, getUserid } = require('../../JWT');
const nodemailer = require('nodemailer');

let join= async (req,res)=>{
    let {fullName, email, password, user_image} = req.body
    console.log(fullName, email, password, user_image)

    pwJWT = createPW(password)
    let result = Users.create({
        user_nickname: fullName,
        user_email : email,
        user_password : pwJWT,
        user_image: user_image
    })

    res.json({join:'success'})
}

let join_ = (req, res) => {
    let user_email = 'saeee210@gmail.com';
    let email_key = email_verify_key();

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
        to: user_email,
        subject: '이메일 인증을 진행해주세요! :) ',
        html: `username 님 안녕하십니까 이메일인증을 위해 url을 클릭해주세요 ${url}`
    }

    transporter.sendMail(options, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log('email has been successfully sent.')
        }
        transporter.close();
    })
    res.send('check your email ')
}

let login = async (req, res)=>{
    let {user_email, user_password} = req.body
    console.log(user_password)
    let pwJWT = createPW(user_password)
    let token = createToken(user_email)

    let getUser = await Users.findOne({
        where:{
            user_email, 
            user_password: user_password} // 나중에 pwJWT로 바꾸기
    })
    let result = {proceed: false, type: 'nouser'}
    if(getUser !== null && getUser.email_verify == 1){
        // 진행
        result.proceed=true;
        result.type='verifieduser'
        result.token=token
        let loggedInAt = new Date().toLocaleDateString()
        let updateLoginTime = await Users.update({
            login_date: loggedInAt
        },{
            where:{ user_email: user_email

            }
        })
        console.log(updateLoginTime)
        
    } else if(getUser !== null && getUser.email_verify == 0) {
        // 인증안됨
        result.type = 'noverified'
    } 
    // nouser
    res.json(result)
}

// 고객이 email url 클릭 시 email_verify 0 -> 1로 변경 
let confirmEmail = async (req, res) => {
    let email_verify_change = await Users.update({ email_verify: 1 }, { where: {} })
    console.log(email_verify_change)
    if (email_verify_change == undefined) {
        res.send('<script type="text/javascript">alert("Not verified"); window.location="/"; </script>');
        return 0;
    } else {
        res.send('<script type="text/javascript"> alert("Successfully verified"); window.location="/user/login"; </script>');
    }
}

let getUserInfo = async (req,res) => {
    let {tokenValue} = req.body
    // 프론트 단으로 던질 정보를 넣을 배열 
    let infoArr = []
    let user_email = getUserid(tokenValue)
    // 유저 정보 가져오기
    let getUser = await Users.findOne({
        where:{
            user_email, 
        }
    })
    // 해당 유저의 메시지 가져오기
    let getMessages = await Messages.findAll({
        where:{
            msg_user_id: user_email,
        }
    })
    console.log(getMessages)
    // 정보 배열에 유저 정보 및 메시지 정보 삽입
    infoArr.push(getUser)
    infoArr.push(getMessages)
    console.log(infoArr)
    // 프론트 단으로 전송
    // 배열의 0번: 유저인포(객체), 1번: 메시지인포(배열)
    res.json(infoArr)
}

module.exports = {
    join, join_, login, confirmEmail, getUserInfo
}
