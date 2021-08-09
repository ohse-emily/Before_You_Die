require('dotenv').config();
const { Users, Lastwords, Messages } = require('../../models');
const { createPW, email_verify_key, createToken, getUserid } = require('../../JWT');
const nodemailer = require('nodemailer');

let join= async (req,res)=>{
    let {fullName, email, password, user_image} = req.body
    console.log(fullName, email, password, user_image)
    let email_key = email_verify_key();

    // front 에서 받아온 정보 db Users 에 저장 by 성민
    pwJWT = createPW(password)
    Users.create({
        user_nickname: fullName,
        user_email : email,
        user_password : pwJWT,
        user_image: user_image,
        email_verify_key:email_key,
    })

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
    res.json({join:'success'})
}

// 고객이 email url 클릭 시 email_verify 0 -> 1로 변경  by세연 
let confirmEmail = async (req, res) => {
    console.log('asdfasdf',req.query.key)
    let email_verify_change = await Users.update({ email_verify: 1 }, { where: {email_verify_key:req.query.key} })
    console.log(email_verify_change)
    if (email_verify_change == undefined) {
        res.send('<script type="text/javascript">alert("Not verified"); window.location="/"; </script>');
        return 0;
    } else {
        res.send('<script type="text/javascript"> alert("Successfully verified");  </script>');
    } //window.location="/user/login";
}


let login = async (req, res)=>{
    let {user_email, user_password} = req.body
    console.log(user_password)
    let pwJWT = createPW(user_password)
    let token = createToken(user_email)

    let getUser = await Users.findOne({
        where:{
            user_email, 
            user_password: pwJWT} // 나중에 pwJWT로 바꾸기
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



let getUserInfo = async (req,res) => {
    let {tokenValue} = req.body
    let user_email = getUserid(tokenValue)
    let getUser = await Users.findOne({
        where:{
            user_email, 
        }
    })

    // 다른 데이터도 가져오기
    // 나중에 배열에 담기
    res.json(getUser.dataValues)
}

module.exports = {
    join, login, confirmEmail, getUserInfo
}
