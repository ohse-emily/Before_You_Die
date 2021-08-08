require('dotenv').config();
const {Users, Lastwords, Messages} = require('../../models');
const {createPW, email_verify_key} = require('../../JWT');
const nodemailer = require('nodemailer');

let join = (req,res)=>{

    let user_nickname = '닉네임'; 
    let user_email = 'saeee210@gmail.com'; 
    let user_password = 'asdf';
    
    let email_key = email_verify_key();
    
    let transporter = nodemailer.createTransport({
        service:'Gmail',
        host:'smtp.gmail.com',
        auth:{
            user:process.env.GoogleID,
            pass:process.env.GooglePW
        }
    })
    let url = `http://` + req.get('host') + `/user/confirmEmail?key=${email_key}`;
    let options = {
        from:'<BYD>',
        to:user_email,
        subject:'이메일 인증을 진행해주세요! :) ',
        html:`username 님 안녕하십니까 이메일인증을 위해 url을 클릭해주세요 ${url}`
    }

    transporter.sendMail(options,function(err,res){
        if(err){
            console.log(err)
        }else{
            console.log('email has been successfully sent.')
        }
        transporter.close();
    })
    res.send('check your email ')
}

let login = (req,res)=>{
    res.send('login')
}


module.exports = {
    join, login, 
}