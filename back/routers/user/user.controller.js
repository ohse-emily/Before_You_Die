require('dotenv').config();
const { Users, Lastwords, Messages } = require('../../models');
const { createPW, email_verify_key } = require('../../JWT');
const nodemailer = require('nodemailer');

let join=(req,res)=>{
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


module.exports = {
    join, join_, login, confirmEmail,
}
